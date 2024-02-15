import Links from "../atoms/Links";
import Image from "next/image";
import { useRouter } from "next/router";
import { v4 } from "uuid";
import { useContext } from "react";
import { GlobalContext } from "@/context";
import { Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react";
import Profile from "@/../../public/svg/Profile.svg"

export default function SPNavbar({ children, title }) {
  const router = useRouter()
  const toast = useToast()
  const { token } = useContext(GlobalContext)

  const url = process.env.NEXT_PUBLIC_API_URL

  const links = [
    {
      href: "/service-providers/dashboard",
      label: "Dashboard" 
    },
    {
      href: "/service-providers/news",
      label: "Pet News",
    },
    {
      href: "/service-providers/appointments",
      label: "Appointments",
    },
    {
      href: "/service-providers/forums",
      label: "Forums",
    }
  ];

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
    <header className="bg-white">
      <nav className="mx-auto w-[80%] flex items-center justify-between py-4">
        <div className="flex gap-x-2">
          <Image src="/logo.svg" alt="logo" width={34} height={34} />
          <Image src="/Pethub.svg" alt="pethub" width={83} height={83} />
        </div>
        <div className="flex gap-x-12">
          {links.map((link) => {
            return <Links key={v4()} link={link} current={children} />;
          })}
        </div>
        <Menu>
          <MenuButton>
            <Image src={Profile} width={'auto'} height={'auto'} alt="profile" />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => router.push("/service-providers/profile")}>profile</MenuItem>
            <MenuItem onClick={handleLogout}>sign out</MenuItem>
          </MenuList>
        </Menu>
      </nav>
      <hr />
      {title && (
        <div className="mx-auto w-[80%] px-5 py-2">
          <h1 className="text-xl font-bold text-gray-800">{children}</h1>
        </div>
      )}
    </header>
  );
}
