"use server";

import { lucia } from "@/auth";
import { prisma } from "@/lib/prisma";
import { loginSchema, LoginValues } from "@/lib/validations";
import { verify } from "@node-rs/argon2";
import { isRedirectError } from "../../../../node_modules/next/dist/client/components/redirect-error";
import { cookies } from "../../../../node_modules/next/headers";
import { redirect } from "../../../../node_modules/next/navigation";

export async function login(
  credentails: LoginValues
): Promise<{ error: string }> {
  try {
    const { email, password } = loginSchema.parse(credentails);

    const exsistingUser = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (!exsistingUser || !exsistingUser.passwordHash) {
      return {
        error: "Incorrect email or password",
      };
    }

    const validatePassword = await verify(
      exsistingUser.passwordHash,
      password,
      {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      }
    );

    if (!validatePassword) {
      return {
        error: "Incorrect username or password",
      };
    }

    const session = await lucia.createSession(exsistingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    const cookiesStore = await cookies();
    cookiesStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);
    return {
      error: "Something went wrong. Please try agian later...",
    };
  }
}
