import Title from "./Title"
import ThemeChangeButton from './ThemeChangeButton';
import useAppData from "@/data/hook/useAppData";

interface TopbarProps {
    title: string,
    subtitle: string
}

export default function Topbar(props: TopbarProps) {
    const {theme, themeChange} = useAppData()
    
    return (
        <div className={`flex`}>
            <Title title={props.title} subtitle={props.subtitle}></Title>
            <div className={`flex flex-grow justify-end`}>
                <ThemeChangeButton theme={theme} themeChange={themeChange}></ThemeChangeButton>
            </div>
        </div>
    )
}