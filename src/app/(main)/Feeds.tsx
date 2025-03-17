"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Post from "@/components/posts/Post";

export interface PostData {
  id: string;
  createdAt: Date;
  userId: string;
  content: string;
  user: {
    username: string;
    displayName: string;
    avatarUrl: string | null;
  };
}

export default function Feeds() {
  const query = useQuery<PostData[]>({
    queryKey: ["post-feed", "for-you"],
    queryFn: async () => {
      const res = await fetch("/api/posts");
      if (!res.ok) {
        throw Error(`Request failed with status code ${res.status}`);
      }
      return res.json();
    },
  });

  if (query.isPending) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (query.isError) {
    return (
      <p className="text-center text-destructive">
        An error occured while fetching posts...
      </p>
    );
  }

  return (
    <>
      {
        (query.data,
        length === 0 && (
          <p className="text-center font-bold text-muted-foreground">
            No posts to show...
          </p>
        ))
      }
      {query.data.map((post: PostData) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}
