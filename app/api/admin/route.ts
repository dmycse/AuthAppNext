import { NextResponse } from "next/server";
import { authRole } from "@/utils/authuser";
import { UserRole } from "@prisma/client";


export async function GET(request: Request) {
  let role = await authRole();

  if (role === UserRole.Admin) {
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(null, { status: 403 });
}