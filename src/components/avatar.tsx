import Image from "../../node_modules/next/image";
import avatarPlaceholder from "@/assets/avatarPlaceholder.png";
import { cn } from "@/lib/utils";

interface AvatarProps {
    imageUrl: string | null | undefined,
    size?: number,
    className?: string
}

export default function Avatar({imageUrl, size, className}: AvatarProps){
    return(
        <Image 
            src={imageUrl || avatarPlaceholder} 
            alt="User avatar" 
            height={size ?? 48} 
            width={size ?? 48}
            className={cn("rounded-full aspect-square flex-none object-cover h-fit", className)}
        />
    )
}