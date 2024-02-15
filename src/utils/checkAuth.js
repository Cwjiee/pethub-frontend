import LoadSpinner from "@/components/atoms/LoadSpinner"
import { GlobalContext } from "@/context"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"

export default function checkAuth(Component) {
  return function CheckAuth(props) {
    const router = useRouter()

    function getCookie() {
      let name = "roles"+ "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    const checkPermission = (roles) => {
      const pathname = router.pathname
      const route = pathname.split('/')[1]

      if (!roles) return false
      if (route === 'admin' && roles !== '3') return false

      return true
    }

    useEffect(() => {

      const roles = getCookie()
      const permit = checkPermission(roles)

      if (!permit) {
        router.push({
          pathname: '/login',
          query: { unauth: true }
        })
      } 
    }, [])


    return <Component {...props} />
  }
}
