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
    .max(200)
    .regex(/^[a-zA-Z _-]*$/, {
      message:
        "Project description can only contain letters, spaces, and underscores",
    }),
  image: z.instanceof(File),
  techStack: z.array(z.string()).min(1),
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
