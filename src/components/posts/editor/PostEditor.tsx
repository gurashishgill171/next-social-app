"use client"

import { useSession } from "@/app/(main)/SessionProvider"
import Avatar from "@/components/avatar"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createPostSchema, CreatePostValues } from "@/lib/validations";
import {useForm} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useTransition } from "react";
import { submitPost } from "./action";


export default function PostEditor() {
    const {user} = useSession();
    const [isePending, startTransition] = useTransition();

    const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
        content: "",
    },
  });

  async function onSubmit({content}: CreatePostValues) {
    startTransition(async() => {
        await submitPost(content);
    })
  }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-5 rounded-md">
                <div className="flex flex-col gap-5">
                    <div className="flex gap-5">
                        <Avatar imageUrl={user.avatarUrl} size={40}/>
                        <FormField control={form.control} name="content" render={({ field }) => (
                            <FormItem className="w-full"> 
                                <FormControl>
                                    <Textarea placeholder="Type your message here..." type={"text"} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                    )}/>
                    </div>
                    <Button disabled={isePending} className="bg-[#2168BA] w-fit self-end cursor-pointer" type="submit">Post</Button>
                </div>
            </form>
        </Form>
    )
}