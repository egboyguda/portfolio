import { db } from "@/db";
import type { Image } from "@prisma/client";
export interface ProjectData {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  demoUrl?: string | null;
  sourceUrl?: string | null;
  image?: Image | null; // Make image optional
  // ... any other project properties
}
// In db/query/getProject.ts:

export async function getProjects(): Promise<ProjectData[] | null> {
  // Return type is now ProjectData[] or null
  try {
    const projects = await db.project.findMany({
      include: {
        images: true, // Include the related image data
      },
    });
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return null;
  }
}
