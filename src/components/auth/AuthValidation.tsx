import Image from "next/image"
import Loading from "../../../public/images/loading.gif"
import useAuthData from "@/data/hook/useAuthData"
import Router from "next/router"
import Head from "next/head"

export default function AuthValidation(props) {

    const { user, loading} = useAuthData()
    
    function renderContent() {
        
        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html:`
                                if(!document.cookie.includes('admin-user-auth')){
                                    window.location.href = "/authentication"
                                }
                            `
                        }}
                    ></script>
                </Head>
                {props.children}
            </>
        )
    }

    function renderLoading() {
        return (
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image src={Loading} alt={"loading"}></Image>
            </div>
        )
    }

    if(!loading && user?.email) {
        return renderContent()
    }else if(loading){
        return renderLoading()
    }else {
        Router.push('/authentication')
        return null
    }
}