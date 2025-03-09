"use server"

import { lucia } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SignupValues, signupSchema } from "@/lib/validations";
import {hash} from "@node-rs/argon2";
import {generateIdFromEntropySize} from "lucia" 
import { isRedirectError } from "../../../../node_modules/next/dist/client/components/redirect-error";
import { cookies } from "../../../../node_modules/next/headers";
import { redirect } from "../../../../node_modules/next/navigation";

export async function signUp(credentails: SignupValues):Promise<{error: string}> {
    try {
        const {email, username, password} = signupSchema.parse(credentails);

        const passwordHash = await hash(password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1,
        });

        const userId = generateIdFromEntropySize(10);

        const exsistingEmail = await prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                }
            }
        });

        if(exsistingEmail) {
            return {
                error: "Email is already taken."
            }
        };

        const exsistingUsername = await prisma.user.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        });

        if(exsistingUsername) {
            return {
                error: "Username is already taken."
            }
        };

        await prisma.user.create({
            data: {
                id: userId,
                email,
                username,
                passwordHash,
                displayName: username
            }
        });

        const session = await lucia.createSession(userId, {});
        const sessionCookie = await lucia.createSessionCookie(session.id);

        const cookiesStore = await cookies();
        cookiesStore.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

        return redirect("/")
    } catch (error) {
        if (isRedirectError(error)) throw error;
        console.log(error);
        return {
            error: "Something went wrong. Please try agian later..."
        }
    }
}