import {z} from "zod";

export const signupSchema = z.object({
    email: z.string().trim().email("Invalid email address"),
    username: z.string().trim().min(3, "Minimum 3 characters required"),
    password: z.string().trim().min(8, "Minimum 8 characters required")
});

export type SignupValues = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
    email: z.string().trim().email("Invalid email address"),
    password: z.string().trim().min(8, "Minimum 8 characters required")
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
    content: z.string().trim().min(3, "Minimum 3 charaecters required")
})

export type CreatePostValues = z.infer<typeof createPostSchema>


 