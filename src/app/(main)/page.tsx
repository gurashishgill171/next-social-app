import PostEditor from "@/components/posts/editor/PostEditor";
import Post from "@/components/posts/Post";
import TrendsSidebar from "@/components/TrendsSidebar";
import { prisma } from "@/lib/prisma";
import Feeds from "./Feeds";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: {
      user: {
        select: {
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <main className="flex w-full gap-5">
      <div className="w-full">
        <PostEditor />
        <div className="mt-10 flex flex-col gap-5">
          <Feeds />
        </div>
      </div>
      <TrendsSidebar />
    </main>
  );
}
