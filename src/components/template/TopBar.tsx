import useAppData from "../../data/hook/useAppData"
import AvatarUser from "./AvatarUser"
import BtnSwitchTheme from "./BtnSwitchTheme"
import Title from "./Title"

interface TopBarProps {
  title: string
  subtitle: string
}

export default function TopBar(props: TopBarProps) {
  const { theme, switchTheme } = useAppData()

  return (
    <div className={`flex`}>
      <Title title={props.title} subtitle={props.subtitle} />
      <div className="flex flex-grow justify-end items-center">
        <BtnSwitchTheme theme={theme} switchTheme={switchTheme} />
        <AvatarUser className="ml-3" />
      </div>
    </div>
  )
}
