import Navbar from "@/components/organisms/Navbar";
import Searchbar from "@/components/molecules/Searchbar";
import BookingBlock from "@/components/molecules/BookingBlock";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "@/context";
import LoadSpinner from "@/components/atoms/LoadSpinner";

export default function PetGrooming() {
  const [input, setInput] = useState("");
  const [groom, setGroom] = useState()
  const { token } = useContext(GlobalContext)
  const [isLoading, setIsLoading] = useState(true)
  const [tokenReady, setTokenReady] = useState(false)

  const url = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    (async () => {
      if (tokenReady) {
        const response = await fetch(`${url}/grooming`, {
          headers: {
            'Content-type': "application/json",
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })

        const data = await response.json()
        setGroom(data.grooming)
        setIsLoading(false)
      }
    })()
  }, [tokenReady])

  useEffect(() => {
    if (token) setTokenReady(true)
  }, [token])

  return !isLoading ? (
    <>
      <Navbar title={true}>Pet Grooming</Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <Searchbar input={input} setInput={setInput} />
        <div className="flex flex-row flex-wrap justify-between gap-3 mt-10">
        {groom && (
          groom.map((v) => {
            return <BookingBlock key={v.user_id} vet={v}/>
          })
        )}
        </div>
      </div>
    </>
  ) : (
    <LoadSpinner />
  )
}
