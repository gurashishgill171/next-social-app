import PostEditor from "@/components/posts/editor/PostEditor";
import TrendsSidebar from "@/components/TrendsSidebar";
import Feeds from "./Feeds";

export default async function Home() {
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
