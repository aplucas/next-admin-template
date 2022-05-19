import useAppData from "../../data/hook/useAppData"
import ForceAuthentication from "../auth/ForceAuthentication"
import Content from "./Content"
import LateralMenu from "./LateralMenu"
import TopBar from "./TopBar"

interface LayoutPros {
  title: string,
  subtitle: string,
  children?: any
}

export default function Layout(props: LayoutPros) {
  const { theme } = useAppData()

  return (
    <ForceAuthentication>
      <div className={`${theme} flex h-screen w-screen`}>
        <LateralMenu />
        <div className={`
        flex flex-col w-full p-7 
        bg-gray-300 dark:bg-gray-800
      `}>
          <TopBar title={props.title} subtitle={props.subtitle} />
          <Content>
            {props.children}
          </Content>
        </div>
      </div>
    </ForceAuthentication>
  )
}
