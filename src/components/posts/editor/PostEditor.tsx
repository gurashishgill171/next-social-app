"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import Avatar from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createPostSchema, CreatePostValues } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useQueryClient } from "@tanstack/react-query";
import { useSubmitMutation } from "./mutations";

export default function PostEditor() {
  const mutation = useSubmitMutation();
  const { user } = useSession();
  const queryClient = useQueryClient();

  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit({ content }: CreatePostValues) {
    mutation.mutate(content, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["post-feed", "for-you"],
        });
      },
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-md bg-white p-5"
      >
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <Avatar imageUrl={user.avatarUrl} size={40} />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className= "w-full">
                  <FormControl>
                    <Textarea
                      placeholder="Type your message here..."
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={mutation.isPending}
            className="w-fit cursor-pointer self-end bg-[#2168BA]"
            type="submit"
          >
            Post
          </Button>
        </div>
      </form>
    </Form>
  );
}
