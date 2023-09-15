import useAuthData from "@/data/hook/useAuthData";
import { bell, home, logout as logoutIcon, settings } from "../icons";
import ItemMenu from "./ItemMenu";
import Logo from "./Logo";

export default function Sidebar() {
    const { logout } = useAuthData()

    return (
        <aside className={`flex flex-col
            bg-gray-200 text-gray-700
            dark:bg-gray-900`
            }>
            <div className={`
                flex flex-col items-center justify-center
                bg-gradient-to-tr from-indigo-500 via-blue-600 to-purple-800
                h-20 w-20
                
            `}>
                <Logo></Logo>
            </div>
            <ul className="flex-grow">
                <ItemMenu url="/" text="Home" icon={home}/>
                <ItemMenu url="/settings" text="Settings" icon={settings}/>
                <ItemMenu url="/notifications" text="Notifications" icon={bell}/>
            </ul>
            <ul>
                <ItemMenu text="Logout" icon={logoutIcon}
                    // onClick={
                    onClick={logout}
                    className={`
                        text-red-600 dark:text-red-400
                        hover:bg-red-400 hover:text-white
                        dark:hover:text-white
                    `}
                />
            </ul>
        </aside>
    )
}