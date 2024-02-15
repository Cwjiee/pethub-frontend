import Image from "next/image";
import Link from "next/link";
import AddPet from "../../../public/svg/AddPet.svg"
import User from "../../../public/png/NewsPlaceholder.png"
import PetCard from "@/components/organisms/PetCard";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import LoadSpinner from "@/components/atoms/LoadSpinner";
import SPNavbar from "@/components/organisms/SPNavbar";
import SPFooter from "@/components/organisms/SPFooter";
import { TimeConvertNotForDateTime } from "@/utils/TimeConvertNotForDateTime";

export default function ServiceProviderProfile() {
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
      <SPNavbar/>
        <div className="w-[90%] mx-auto mt-16">
            <div className="flex mb-5">
                <Link href={'./edit'} className="mx-auto">
                    <button className="text-white text-sm bg-[#222] py-3 px-16 rounded-lg mx-auto">
                        Edit Profile 
                    </button>
                </Link>
            </div>
            
            <img class="mx-auto rounded-[10px] ring ring-white" src={user.image} width={350} height={300} alt="avatar"/>  
            {user && (
                <div class="flex flex-wrap justify-center gap-x-5">
                    <div className="bg-white px-6 py-5 rounded-[10px] shadow-lg w-[500px] h-[450px] mt-5">
                        <h2 className="text-lg text-center font-bold mb-4">Service Provider Profile Details</h2>
                        <div><b>Service Name:</b> {user.full_name}</div>
                        <div className="mt-2"><b>Email: </b> {user.email}</div>
                        <div className="mt-2"><b>Contact Number: </b> {user.contact_number}</div>
                        <div className="mt-2"><b>Opening Hours: </b>{TimeConvertNotForDateTime(user.opening_hour)}</div>
                        <div className="mt-2"><b>Closing Hours: </b>{TimeConvertNotForDateTime(user.closing_hour)}</div>
                        <div className="mt-2"><b>Service Type: </b>{user.service_type}</div>
                        <div className="mt-2"><b>Deposit Range: </b>RM {user.deposit_value.toFixed(2)}</div>
                        <div className="mt-5 font-bold">About Me</div>
                        <div className="mt-1">{user.description}</div>
                    </div>
                    <div className="bg-white px-6 py-5 rounded-[10px] shadow-lg w-[500px] h-[450px] mt-5">
                        <h2 className="text-lg text-center font-bold mb-4">Service Provider Banking Details</h2>
                        <div className="mt-2"><b>Bank Name: </b> {user.contact_number}</div>
                        <div className="mt-2"><b>Beneficiary Account Number: </b>{TimeConvertNotForDateTime(user.opening_hour)}</div>
                        <div className="mt-2 mb-2"><b>Beneficiary Account Name: </b>{TimeConvertNotForDateTime(user.closing_hour)}</div>
                        <Link target="_blank" href={user.qr_code_image} className="text-blue-500 underline hover:text-blue-600 active:text-blue-700">View QR code Image</Link>
                    </div>
                </div> 
            )}
        </div>
        
      <SPFooter/>
    </>
  ) : (
    <LoadSpinner />
  )
}


ServiceProviderProfile.getLayout = function getLayout(page) {
    return (
      <>
        <main>
          {page}
        </main>
      </>
    )
  }
