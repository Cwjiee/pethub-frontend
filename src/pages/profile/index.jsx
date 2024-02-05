import Navbar from "@/components/organisms/Navbar";
import Image from "next/image";
import Link from "next/link";
import AddPet from "../../../public/svg/AddPet.svg"
import User from "../../../public/png/NewsPlaceholder.png"
import PetCard from "@/components/organisms/PetCard";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import LoadSpinner from "@/components/atoms/LoadSpinner";

export default function Profile() {
  const { token } = useContext(GlobalContext)
  const [user, setUser] = useState({})
  const [tokenReady, setTokenReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      if (tokenReady) {
        const response = await fetch(`http://localhost/api/v1/profile`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          }
        })
        const result = await response.json()
        console.log(result)
        setUser(result.user)
        setIsLoading(false)
      }
    })()
  }, [tokenReady])

  useEffect(() => {
    if (token) setTokenReady(true)
  }, [token])

  return !isLoading ? (
    <>
      {console.log(user.image)}
      <Navbar></Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <div className="flex flex-row mt-5 gap-x-4">
          <div className="flex flex-col gap-y-4 justify-end">
            <Image class="inline-block rounded-[10px] ring ring-white" src={user.image} width={250} height={250} alt="avatar"/>
              <Link href={`./pet-owners/edit/${user.user_id}`} className="flex justify-around px-8 py-3 rounded-[10px] bg-[#222]">
                <div className="my-auto text-white spacing tracking-[0.86px] text-sm">
                  Edit Profile 
                </div>
              </Link>
          </div>

          <div className="flex flex-col gap-y-4">
            <div className="flex flex-row gap-x-4">
              <Link href={'./pet-owners/pets/add'} className="flex justify-around px-8 py-3 rounded-[10px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700">
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
              <div className="bg-white px-6 py-5 rounded-[10px] shadow-lg ">
                <div>Name: {user.full_name}</div>
                <div className="mt-2">Email: {user.email}</div>
                <div className="mt-2">Contact Number: {user.contact_number}</div>
                <div className="mt-5 font-bold">About Me</div>
                <div className="mt-1">{user.description}</div>
              </div>
            )}
          </div>
        </div>
        <div>
            <h1 className="text-center mt-16 mb-10 text-2xl font-bold">Pets</h1>

            <div className="flex flex-wrap justify-center gap-x-8">
              {user.pets ? (
                user.pets.map((pet) => {
                  return (
                    <PetCard key={pet.id} pet={pet}/>
                  )
                })
              ) : (
                <div>No pets found here. Add yours now!</div>
              )}
            </div>
        </div>
      </div>
    </>
  ) : (
    <LoadSpinner />
  )
}
