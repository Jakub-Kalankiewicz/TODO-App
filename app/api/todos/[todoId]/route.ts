import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import Joi from "joi";
import { NextResponse } from "next/server";

enum Status {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

interface RequestBody {
  status: Status;
}

const UpdateTodoSchema = Joi.object({
  status: Joi.string()
    .valid(Status.TO_DO, Status.IN_PROGRESS, Status.DONE)
    .required(),
});

export async function PUT(
  request: Request,
  context: { params: { todoId: string } }
) {
  try {
    console.log(context);
    const currenUser = await getCurrentUser();
    if (!currenUser?.id || !currenUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { error } = UpdateTodoSchema.validate(body);
    if (error) {
      return new NextResponse(error.details[0].message, { status: 400 });
    }

    const { status } = body as RequestBody;

    if (!context.params.todoId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const todo = await prisma.todo.findUnique({
      where: { id: context.params.todoId },
    });

    if (!todo) {
      return new NextResponse("Not found", { status: 404 });
    }

    if (status === "DONE") {
      await prisma.todo.update({
        where: { id: context.params.todoId },
        data: { status, completed: true },
      });
    } else {
      await prisma.todo.update({
        where: { id: context.params.todoId },
        data: { status, completed: false },
      });
    }

    return new NextResponse("Updated", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: { todoId: string } }
) {
  try {
    const currenUser = await getCurrentUser();
    if (!currenUser?.id || !currenUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!context.params.todoId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const todo = await prisma.todo.findUnique({
      where: { id: context.params.todoId },
    });

    if (!todo) {
      return new NextResponse("Not found", { status: 404 });
    }

    await prisma.todo.delete({ where: { id: context.params.todoId } });

    return new NextResponse("Deleted", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
}
``;
