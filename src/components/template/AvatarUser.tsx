import useAuthData from "@/data/hook/useAuthData"
import Link from "next/link"

interface AvatarUserProps {
    className?: string
}

export default function AvatarUser(props: AvatarUserProps) {
    const {user} = useAuthData()

    return (
        <Link href="/perfil">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
                src={user?.urlImage ?? '/images/avatar.svg'} 
                alt="User Avatar"
                className={`h-10 w-10 rounded-full cursor-pointer ${props.className}`}
            ></img>
        </Link>
    )
}