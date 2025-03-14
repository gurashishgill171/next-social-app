import PostEditor from "@/components/posts/editor/PostEditor";
import Post from "@/components/posts/Post";
import TrendsSidebar from "@/components/TrendsSidebar";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: {
      user: {
        select: {
          username: true,
          displayName: true,
          avatarUrl: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  return (
    <main className="w-full flex gap-5">
      <div className="w-full">
        <PostEditor />
        <div className="flex flex-col gap-5 mt-10">
          {
            posts.map((post) => (
              <Post key={post.id} post={post}/>
            ))
          }
        </div>
      </div>
      <TrendsSidebar />
    </main>
  );
}
