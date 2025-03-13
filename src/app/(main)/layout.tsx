import { validateRequest } from "@/auth";
import React from "react";
import { redirect } from "../../../node_modules/next/navigation";
import Navbar from "./Navbar";
import SessionProvider from "./SessionProvider";


export default async function Layout({children}: {children: React.ReactNode}) {
    const session = await validateRequest();

    if(!session.user) {
        redirect("/login");
    }

    return (
        <SessionProvider value={session}>
            <div className="flex flex-col">
                <Navbar />
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </div>
        </SessionProvider>
    )
}