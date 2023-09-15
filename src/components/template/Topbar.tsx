import Title from "./Title"
import ThemeChangeButton from './ThemeChangeButton';
import useAppData from "@/data/hook/useAppData";
import AvatarUser from "./AvatarUser";

interface TopbarProps {
    title: string,
    subtitle: string
}

export default function Topbar(props: TopbarProps) {
    const {theme, themeChange} = useAppData()
    
    return (
        <div className={`flex`}>
            <Title title={props.title} subtitle={props.subtitle}></Title>
            <div className={`flex flex-grow justify-end items-center`}>
                <ThemeChangeButton theme={theme} themeChange={themeChange}></ThemeChangeButton>
                <AvatarUser className="ml-3"></AvatarUser>
            </div>
        </div>
    )
}