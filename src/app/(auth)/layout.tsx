import { validateRequest } from "@/auth";
import React from "react";
import { redirect } from "../../../node_modules/next/navigation";


export default async function Layout({children}: {children: React.ReactNode}) {
    const {user} = await validateRequest();

    if(user) {
        redirect("/");
    }

    return (
        <>{children}</>
    )
}