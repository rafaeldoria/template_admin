import Layout from "@/components/template/Layout";
import useAppData from "@/data/hook/useAppData";

export default function Home() {
  const {theme, themeChange} = useAppData()
  
  return (
    <Layout title="Notifications" subtitle="Your notifications">
      <button onClick={themeChange}>Theme Change</button>
    </Layout>
  )
}
