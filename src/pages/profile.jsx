import Navbar from "@/components/organisms/Navbar";
import Image from "next/image";
import Link from "next/link";
import AddPet from "../../public/svg/AddPet.svg"
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import User from "../../public/png/NewsPlaceholder.png"

export default function Profile() {
  const url = process.env.NEXT_PUBLIC_API_URL
  const { token } = useContext(GlobalContext)
  const [user, setUser] = useState()

  useEffect(() => {
    (async () => {
      const response = await fetch(`${url}/profile`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      })

      const result = await response.json()
      setUser(result.user)
      console.log(result.user)
    })()
  }, [])

  return (
    <>
      <Navbar></Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <div className="flex flex-row mt-5 gap-x-4">
          <div className="flex flex-col gap-y-4 justify-end">
            <Image class="inline-block rounded-[10px] ring ring-white" src={User} width={250} height={250} alt="avatar"/>
              <Link href={'./pet-owners/edit'} className="flex justify-around px-8 py-3 rounded-[10px] bg-[#222]">
                <div className="my-auto text-white spacing tracking-[0.86px] text-sm">
                  Edit Profile 
                </div>
              </Link>
          </div>

          <div className="flex flex-col gap-y-4">
            <div className="flex flex-row gap-x-4">
              <Link href={'./pet-owners/pets'} className="flex justify-around px-8 py-3 rounded-[10px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700">
                <Image src={AddPet} alt="add" width={20} height={20} />
                <div className="my-auto text-white spacing tracking-[0.86px] text-sm ml-1">
                  Add Pets
                </div>
              </Link>
              <Link href={'./appointments'} className="flex justify-around px-8 py-3 rounded-[10px] bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700">
                <div className="my-auto text-white spacing tracking-[0.86px] text-sm">
                  View Appointments
                </div>
              </Link>
            </div>
            {user && (
              <div className="bg-white px-3 py-4 rounded-[10px] shadow-lg">
                <div>Name: </div>
                <div className="mt-2">Email: {user.email}</div>
                <div className="mt-2">Contact Number: {user.contact_number}</div>
                <div className="mt-5 font-bold">About Me</div>
                <div className="mt-1">{user.description}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
