import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const count = await prisma.todo.count({
      where: {
        userId: currentUser.id,
      },
    });

    if (!count || isNaN(count)) {
      return new NextResponse("Invalid count", { status: 500 });
    }

    return NextResponse.json({ count });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
