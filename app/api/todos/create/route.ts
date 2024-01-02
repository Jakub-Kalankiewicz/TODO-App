import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import Joi from "joi";
import prisma from "@/app/libs/prismadb";

interface RequestBody {
  title: string;
  description: string;
}

const CreateTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { error } = CreateTodoSchema.validate(body);
    if (error) {
      return new NextResponse(error.details[0].message, { status: 400 });
    }

    const { title, description } = body as RequestBody;

    if (!title || !description) {
      return new NextResponse("Bad Request", { status: 400 });
    }
    try {
      await prisma.$transaction(async (prisma) => {
        const todo = await prisma.todo.create({
          data: {
            title,
            description,
            userId: currentUser.id,
            status: "TO_DO",
            completed: false,
          },
        });

        await prisma.user.update({
          where: { id: currentUser.id },
          data: { todos: { connect: { id: todo.id } } },
        });
      });

      return new NextResponse("Todo created", { status: 201 });
    } catch (error: any) {
      return new NextResponse(error.message, { status: 500 });
    }
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
