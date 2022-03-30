import Content from "./Content"
import LateralMenu from "./LateralMenu"
import TopBar from "./TopBar"

interface LayoutPros {
  title: string,
  subtitle: string,
  children?: any
}

export default function Layout(props: LayoutPros) {
  return (
    <div className={`flex h-screen w-screen`}>
      <LateralMenu />
      <div className={`flex flex-col w-full p-7 bg-gray-300`}>
        <TopBar title={props.title} subtitle={props.subtitle} />
        <Content>
          {props.children}
        </Content>
      </div>
    </div>
  )
}
