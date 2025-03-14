"use client";

import UserButton from "@/components/UserButton";
import Link from "../../../node_modules/next/link";
import SearchBar from "@/components/SearchBar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold text-[#2168BA]">EduGlobe</h1>
        </Link>
        <div className="flex items-center gap-5">
          <SearchBar />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
