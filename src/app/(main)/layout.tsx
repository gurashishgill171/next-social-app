import { validateRequest } from "@/auth";
import React from "react";
import { redirect } from "../../../node_modules/next/navigation";
import MenuBar from "./MenuBar";
import Navbar from "./Navbar";
import SessionProvider from "./SessionProvider";


export default async function Layout({children}: {children: React.ReactNode}) {
    const session = await validateRequest();

    if(!session.user) {
        redirect("/login");
    }

    return (
        <SessionProvider value={session}>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
                    <MenuBar className="hidden sm:block sticky top-0 bg-[#2168BA] h-fit rounded-md p-5 text-white"/>
                    {children}
                </div>
            </div>
        </SessionProvider>
    )
}