"use client";

import { Post } from "@prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Avatar from "../avatar";
import Link from "../../../node_modules/next/link";
import { formatRelativeDate } from "@/lib/utils";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const [showActions, setShowActions] = useState<boolean>(false);
  return (
    <Card>
      <CardHeader className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/users/${post.user.username}`}>
            <Avatar imageUrl={post.avatarUrl} size={34} />
          </Link>
          <div className="flex flex-col">
            <Link
              href={`/users/${post.user.username}`}
              className="font-medium hover:underline"
            >
              {post.user.displayName}
            </Link>
            <Link
              href={`posts/${post.id}`}
              className="text-sm text-muted-foreground hover:underline"
            >
              {formatRelativeDate(new Date(post.createdAt))}
            </Link>
          </div>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Ellipsis
                size={20}
                onClick={() => setShowActions(!showActions)}
                className="cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer">
                <Trash2 className="text-red-500" />
                <span className="text-red-500">Delete post</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Pencil />
                <span>Edit post</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
      </CardContent>
    </Card>
  );
}
