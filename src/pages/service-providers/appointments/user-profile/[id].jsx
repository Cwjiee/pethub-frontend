import LoadSpinner from '@/components/atoms/LoadSpinner'
import SPFooter from '@/components/organisms/SPFooter'
import SPNavbar from '@/components/organisms/SPNavbar'
import Link from 'next/link'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '@/context'
import PetCard from '@/components/organisms/PetCard'
import { useRouter } from 'next/router'
import BackButton from '@/components/atoms/BackButton'
export default function ServiceProviderSpecificUserProfile() {
  const { token } = useContext(GlobalContext)
  const [petOwner, setPetOwner] = useState({})
  const [tokenReady, setTokenReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();
  const id = router.query.id;
  const url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    (async () => {
      if (tokenReady) {
        const response = await fetch(`${url}/service-provider/user-profile/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          }
        })
        const result = await response.json()
        console.log(result)
        setPetOwner(result.pet_owner)
        setIsLoading(false)
      }
    })()
  }, [tokenReady, id])

  useEffect(() => {
    if (token && id) setTokenReady(true)
  }, [token, id])

  return !isLoading ? (
    <>
      <SPNavbar/>
      
      <div className="w-[80%] m-auto pt-6 px-6">
      <BackButton/>
        <div className="flex flex-row mt-5 gap-x-4">
          <div className="flex flex-col gap-y-4 justify-end">
            <Image class="inline-block rounded-[10px] ring ring-white" src={petOwner.image} width={250} height={250} alt="avatar"/>
          </div>

          <div className="flex flex-col gap-y-4">
  
            {petOwner && (
              <div className="bg-white px-6 py-5 rounded-[10px] shadow-lg ">
                <div><b>Name:</b> {petOwner.full_name}</div>
                <div className="mt-2"><b>Email:</b> {petOwner.email}</div>
                <div className="mt-2"><b>Contact Number:</b> {petOwner.contact_number}</div>
                <div className="mt-5 font-bold"><b>About Me</b></div>
                <div className="mt-1">{petOwner.description}</div>
              </div>
            )}
          </div>
        </div>
        <div>
            <h1 className="text-center mt-16 mb-10 text-2xl font-bold">Pets</h1>

            <div className="flex flex-wrap justify-center gap-x-8">
              {petOwner.pets ? (
                petOwner.pets.map((pet) => {
                  return (
                    <div className="bg-white w-[350px] rounded-lg shadow-lg" key={pet.id}>
                        <Image src={pet.image} alt="this is a text" className="overflow-auto rounded-t-lg" width={350} height={100}/>
                        <div className="py-5 px-5">
                            <div><b>Name: </b>{pet.pet_name}</div>
                            <div><b>Type: </b>{pet.type}</div>
                            <div><b>Breed: </b>{pet.breed}</div>
                            <div><b>Age: </b>{pet.age}</div>
                            <div><b>Description: </b>{pet.description}</div>
                        </div>
                    </div>
                  )
                })
              ) : (
                <div>No pets found here. Add yours now!</div>
              )}
            </div>
        </div>
      </div>
      <SPFooter/>
    </>
  ) : (
    <LoadSpinner />
  )
}

ServiceProviderSpecificUserProfile.getLayout = function getLayout(page) {
  return (
    <>
      <main>
        {page}
      </main>
    </>
  )
}