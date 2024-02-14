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

    useEffect(() => {

      const roles = getCookie()
      console.log(roles)

      if (!roles) {
        router.push({
          pathname: '/login',
          query: { result: true }
        })
      } 
    }, [])


    return <Component {...props} />
  }
}
