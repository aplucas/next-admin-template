import useAppData from "../../data/hook/useAppData"
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
      <div className="flex flex-grow justify-end">
        <BtnSwitchTheme theme={theme} switchTheme={switchTheme} />
      </div>
    </div>
  )
}
