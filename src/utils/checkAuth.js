import { GlobalContext } from "@/context"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"

export default function checkAuth(Component) {
  return function CheckAuth(props) {
    const router = useRouter()
    const { userId } = useContext(GlobalContext)

    useEffect(() => {
      if (!userId) {
        router.push({
          pathname: '/login',
          query: { result: true }
        })
      }
    }, [router, userId])

    return <Component {...props} />
  }
}
