"use server";
import { z } from "zod";

//ini validtion rules
//dapat ini na data a ig sesend sa frontend
const addProjectSchema = z.object({
  title: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z _-]*$/, {
      message:
        "Project title can only contain letters, spaces, and underscores",
    }),
  description: z
    .string()
    .min(10)
    .regex(/^[a-zA-Z0-9 _\-,.!?()&]*$/, {
      message:
        "Project description can only contain letters, numbers, spaces, underscores, hyphens, and common punctuation marks (.,!?()&)",
    }),

  image: z.instanceof(File),
  techStack: z
    .string() // This will initially be a string, as it's coming from FormData
    .min(1) // Ensure the string is not empty
    .transform((val) => {
      try {
        const parsed = JSON.parse(val); // Try to parse the string into an array
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return []; // Return an empty array if parsing fails
      }
    })
    .refine((val) => Array.isArray(val), {
      message: "Tech stack should be an array", // Ensure it's an array after parsing
    }),
  //.min(1, { message: "Tech stack array should have at least one item" }),
  demoUrl: z.string().url(),
  sourceUrl: z.string().url(),
});

//gamit n pag back sa fronend kung
//may error
interface CreateProjectState {
  errors: {
    title?: string[];
    description?: string[];
    techStack?: string[];
    demoUrl?: string[];
    sourceUrl?: string[];
  };
  success?: boolean;
}

//function pag add project
export async function addProject(
  formState: CreateProjectState,
  formData: FormData
  //dd dpat n na function
  //mag return error or success
  //to satify the function
): Promise<CreateProjectState> {
  {
    // dd check the data na gn pasa sa fronend
    //kung valid
    const result = addProjectSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      image: formData.get("image"),
      techStack: formData.get("techStack"),
      demoUrl: formData.get("demoUrl"),
      sourceUrl: formData.get("sourceUrl"),
    });
    console.log(formData.get("techStack"));

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    return {
      errors: {},
      success: true,
    };
  }
}
