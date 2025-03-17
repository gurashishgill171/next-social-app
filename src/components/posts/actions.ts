"use server";

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function deletePost(id: string) {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Unauthorised");
  }

  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  if (!post) {
    throw new Error("Post not found...");
  }

  if (post.userId !== user.id) {
    throw new Error("Unauthorised");
  }

  await prisma.post.delete({
    where: {
      id: id,
    },
  });
}
