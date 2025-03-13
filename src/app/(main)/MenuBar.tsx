import { Button } from "@/components/ui/button";
import Link from "../../../node_modules/next/link";
import { House, Bell, Bookmark } from 'lucide-react';


interface MenuBarProps {
    className?: string;
}

export default function MenuBar({className}: MenuBarProps) {

    return (
        <div className={className}>
            <Button variant="ghost" className="flex items-center justify-start" asChild title="Home">
                <Link href={'/'}>
                    <House />
                    <span className="hidden lg:block">Home</span>
                </Link>
            </Button>
            <Button variant="ghost" className="flex items-center justify-start" asChild title="Notifications">
                <Link href={'/notifications'}>
                    <Bell />
                    <span className="hidden lg:block">Notifications</span>
                </Link>
            </Button>
            <Button variant="ghost" className="flex items-center justify-start" asChild title="Bookmarks">
                <Link href={'/notifications'}>
                    <Bookmark />
                    <span className="hidden lg:block">Bookmarks</span>
                </Link>
            </Button>
        </div>
    )
}