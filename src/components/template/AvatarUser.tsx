import Link from "next/link";
import useAuth from "../../data/hook/useAuth";

interface AvatarUserProps {
  className?: string
}

export default function AvatarUser(props: AvatarUserProps) {
  const { user } = useAuth()

  return (
    <Link href={`/profile`}>
      <img
        src={user?.photoUrl ?? '/images/avatar.svg'}
        alt="Avatar do usuário"
        className={`
          w-10 h-10 rounded-full cursor-pointer
          ${props.className}
        `}
      />
    </Link>
  )
}
