"use server";
import { z } from "zod";
import { db } from "@/db";
import cloudinary from "@/utils/cloudinary";

import type { UploadApiResponse } from "cloudinary";

const addProjectSchema = z.object({
  title: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z _-]*$/, {
      message:
        "Project title can only contain letters, spaces, and underscores",
    }),
  description: z.string().min(10),
  techStack: z
    .string()
    .min(1)
    .transform((val) => {
      try {
        const parsed = JSON.parse(val);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    })
    .refine((val) => Array.isArray(val), {
      message: "Tech stack should be an array",
    }),
  demoUrl: z.string().url().optional(),
  sourceUrl: z.string().url().optional(),
});

interface CreateProjectState {
  errors: {
    title?: string[];
    description?: string[];
    techStack?: string[];
    demoUrl?: string[];
    sourceUrl?: string[];
    images?: string[];
  };
  success?: boolean;
  message?: string;
}

export async function addProject(
  formState: CreateProjectState,
  formData: FormData
): Promise<CreateProjectState> {
  const result = addProjectSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    techStack: formData.get("techStack"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      success: false,
      message: "Validation errors",
    };
  }

  try {
    const project = await db.project.create({
      data: {
        title: result.data.title,
        description: result.data.description,
        demoUrl: result.data.demoUrl,
        sourceUrl: result.data.sourceUrl,
        techStack: result.data.techStack,
      },
    });

    const files = formData.getAll("image") as File[];

    if (files && files.length > 0) {
      const uploadPromises = files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        try {
          const uploadResult: UploadApiResponse = await new Promise(
            (resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                (error, result) => {
                  if (error) reject(error);
                  else if (result) resolve(result);
                  else
                    reject(
                      new Error("Cloudinary upload returned no error or result")
                    );
                }
              );
              uploadStream.end(buffer);
            }
          );
          return uploadResult;
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
          throw new Error(
            `Image upload failed: ${
              (uploadError as Error)?.message || "Unknown error"
            }`
          );
        }
      });

      try {
        const uploadResults = await Promise.all(uploadPromises);

        await Promise.all(
          uploadResults.map(async (uploadResult) => {
            await db.image.create({
              data: {
                projectId: project.id,
                url: uploadResult.url,
                public_id: uploadResult.public_id,
              },
            });
          })
        );
      } catch (allUploadErrors) {
        console.error("One or more image uploads failed:", allUploadErrors);
        return {
          errors: { images: ["One or more image uploads failed"] },
          success: false,
          message: "One or more image uploads failed",
        };
      }
    }

    return {
      errors: {},
      success: true,
      message: "Project created successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error adding project:", error);
      return {
        errors: { images: [error.message || "Failed to create project"] }, // Or a more appropriate error key
        success: false,
        message: "Failed to create project",
      };
    } else {
      console.error("Error adding project:", error);
      return {
        errors: { images: ["Failed to create project"] }, // Or a more appropriate error key
        success: false,
        message: "Failed to create project",
      };
    }
  }
}
