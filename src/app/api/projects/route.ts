import { getProjects } from "@/db/query/getProject";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log(request.url);
  const projects = await getProjects();
  return NextResponse.json(projects);
}
