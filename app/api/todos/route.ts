import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const params = new URL(request.url).searchParams;
    const page = parseInt(params.get("page") || "1", 10);
    const pageSize = parseInt(params.get("pageSize") || "6", 10);
    const sort = params.get("sort");
    const order = params.get("order")?.toLowerCase();

    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const count = await prisma.todo.count({
      where: { userId: currentUser.id },
    });

    if (count === 0) {
      return NextResponse.json([]);
    }
    const totalPages = Math.ceil(count / pageSize);

    if (
      isNaN(page) ||
      page < 1 ||
      page > totalPages ||
      isNaN(pageSize) ||
      pageSize !== 6
    ) {
      return new NextResponse("Invalid pagination parameters", { status: 400 });
    }

    const validSortKeys = ["id", "title", "description", "status", "completed"];
    const isValidSortKey = sort ? validSortKeys.includes(sort) : false;
    const isValidOrder = order === "asc" || order === "desc";

    if ((sort && !isValidSortKey) || (order && !isValidOrder)) {
      return new NextResponse("Invalid sorting parameters", { status: 400 });
    }

    const todos = await prisma.todo.findMany({
      where: { userId: currentUser.id },
      orderBy: sort ? { [sort]: order } : undefined,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return NextResponse.json(todos);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
