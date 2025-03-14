"use client"

import UserButton from "@/components/UserButton";
import Link from "../../../node_modules/next/link";


export default function Navbar() {
    return (
        <header className="sticky top-0 z-10 shadow-sm bg-white">
            <div className="mx-auto max-w-7xl gap-5 px-5 py-3 flex items-center justify-between">
                <Link href={'/'}>
                    <h1 className="text-2xl font-bold text-[#2168BA]">EduGlobe</h1>
                </Link>
                <div>
                    <UserButton />
                </div>
            </div>
        </header>
    )
}