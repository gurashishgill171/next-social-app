"use client"

import { logout } from "@/app/(auth)/actions";
import { useSession } from "@/app/(main)/SessionProvider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "../../node_modules/next/link";
import Avatar from "./avatar"


export default function UserButton(){
  const {user} = useSession();
    return(
      <>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar imageUrl={user.avatarUrl} size={32}/>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/user/${user.username}`}>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
          </DropdownMenuContent> 
        </DropdownMenu>
      </>
    )
}