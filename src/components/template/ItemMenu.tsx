import Link from "next/link"

interface ItemMenuProps {
    text: string
    icon: any
    url?: string
    className?: string
    onClick?: (event: any)  => void
}

export default function ItemMenu(props: ItemMenuProps) {
    function renderLink() {
        return (
            <a className={`
                flex flex-col justify-center items-center
                h-20 w-20 text-gray-600
                dark:text-gray-300
                ${props.className}
            `}>
                {props.icon}
                <span className={`
                    text-xs font-light
                `}>
                    {props.text}
                </span>
            </a>
        )
    }

    return (
        <li onClick={props.onClick}
        className={`
            hover:bg-gray-100 dark:hover:bg-gray-800
            cursor-pointer
        `}>
            {props.url ? (
                <Link href={props.url} legacyBehavior>
                    {renderLink()}
                </Link>
            ) : (
                renderLink()
            )}
        </li>
    )
}