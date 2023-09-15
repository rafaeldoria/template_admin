import useAppData from "@/data/hook/useAppData"
import Content from "./Content"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import AuthValidation from "../auth/AuthValidation"

interface LayoutProps {
    title: string,
    subtitle: string
    children?: any
}

export default function Layout(props: LayoutProps) {
    const {theme} = useAppData()

    return (
        <AuthValidation>
            <div className={`
                ${theme} flex h-screen w-screen
            `}>
                <Sidebar />
                <div className={`
                    flex flex-col 
                    w-full p-7 bg-gray-400
                    dark:bg-gray-800
                `}>
                    <Topbar title={props.title} subtitle={props.subtitle}></Topbar>

                    <Content >
                        {props.children }
                    </Content>

                </div>
            </div>
        </AuthValidation>
    )
}