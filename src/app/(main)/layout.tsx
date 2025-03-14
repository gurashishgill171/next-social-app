import { validateRequest } from "@/auth";
import React from "react";
import { redirect } from "../../../node_modules/next/navigation";
import MenuBar from "./MenuBar";
import Navbar from "./Navbar";
import SessionProvider from "./SessionProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  if (!session.user) {
    redirect("/login");
  }

  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col bg-gray-100">
        <Navbar />
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
          <MenuBar className="sticky top-0 hidden h-fit w-fit rounded-md px-5 text-[#2168BA] sm:block lg:w-80" />
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
