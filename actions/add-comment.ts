"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { CommentSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const addComment = async (values: z.infer<typeof CommentSchema>) => {
  const validatedFields = CommentSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { comment, complaintId } = validatedFields.data;
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return { error: "Login to add a comment" };
  }
  try {
    await db.comment.create({
      data: {
        content: comment,
        complaintId,
        userId,
      },
    });
  } catch (error) {
    return { error: error };
  }

  revalidatePath(`/complaint/${complaintId}`);

  return { success: "Comment added!" };
};
