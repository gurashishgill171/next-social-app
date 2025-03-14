import { validateRequest } from "@/auth";
import { Card } from "./ui/card";
import { prisma } from "@/lib/prisma";
import { Button } from "./ui/button";
import Avatar from "./avatar";

export default function TrendsSidebar() {
  return (
    <Card className="sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 p-5 md:block lg:w-80">
      <WhoToFollow />
    </Card>
  );
}

async function WhoToFollow() {
  const { user } = await validateRequest();

  if (!user) return null;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
    },
    select: {
      id: true,
      username: true,
      displayName: true,
      avatarUrl: true,
    },
  });
  return (
    <div>
      <h1 className="text-2xl font-bold">Who to follow</h1>
      <div className="mt-5 flex flex-col gap-5">
        {usersToFollow.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar imageUrl={user.avatarUrl} size={40} />
              <div>
                <h1>{user.displayName}</h1>
                <span className="text-sm text-muted-foreground">
                  @{user.username}
                </span>
              </div>
            </div>
            <Button className="cursor-pointer bg-[#2168BA]">Follow</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
