import { GlobalContext } from "@/context"
import Image from "next/image"
import { useContext } from "react"
import { useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"

export default function AdminNavbar() {
  const url = process.env.NEXT_PUBLIC_API_URL
  const { token } = useContext(GlobalContext)
  const toast = useToast()
  const router = useRouter()

  const handleLogout = async () => {
    const response = await fetch(`${url}/logout`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      }
    })

    if (!response.ok) {
      toast({
        title: "failed to sign out",
        description: 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } else {
      toast({
        title: "sign out successfully",
        description: 'We will redirect back to landing page',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      document.cookie = "roles=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      sessionStorage.clear()
      router.push('/')
    }
  }

  return (
    <>
      <header className="bg-white">
        <nav className="mx-auto w-[90%] flex items-center justify-between py-4 h-1/6">
          <div className="flex gap-x-2">
            <Image src="/logo.svg" alt="logo" width={34} height={34} />
            <Image src="/Pethub.svg" alt="pethub" width={83} height={83} />
          </div>
          <div className="flex gap-x-6 items-center">
            <div>Admin Mode</div>
            <button onClick={handleLogout} className="flex justify-around px-12 py-3 rounded-[10px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700">
              <div className="my-auto text-white font-bold spacing tracking-[0.86px] text-md">
                Logout
              </div>
            </button>
          </div>
        </nav>
      </header>
    </>
  )
}
