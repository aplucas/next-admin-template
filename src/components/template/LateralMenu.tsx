import { IconBell, IconHome, IconLogout, IconSettings } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function LateralMenu() {
  return (
    <aside className={`
      flex flex-col
      bg-gray-200 text-gray-700
      dark:bg-gray-900 
    `}>
      <div className={`
        flex flex-col items-center justify-center
        bg-gradient-to-r from-indigo-500 to-purple-800
        h-20 w-20 
      `}>
        <Logo />
      </div>
      <ul className="flex-grow">
        <MenuItem url="/" text="Início" icon={IconHome} />
        <MenuItem url="/settings" text="Ajustes" icon={IconSettings} />
        <MenuItem url="/notifications" text="Notificações" icon={IconBell} />
      </ul>
      <ul>
        <MenuItem className={`
          text-red-600 dark:text-red-400
          hover:bg-red-400 hover:text-white
          dark:hover:text-white
        `} text="Sair" icon={IconLogout} onClick={() => console.log("logout")} />
      </ul>
    </aside>
  )
}
