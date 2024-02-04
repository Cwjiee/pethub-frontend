import Navbar from "@/components/organisms/Navbar";
import Searchbar from "@/components/molecules/Searchbar";
import BookingBlock from "@/components/molecules/BookingBlock";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "@/context";
import LoadSpinner from "@/components/atoms/LoadSpinner";
import { useRouter } from "next/router";

export default function Veterinary() {
  const [input, setInput] = useState("");
  const [vet, setVet] = useState()
  const { token } = useContext(GlobalContext)
  const [isLoading, setIsLoading] = useState(true)
  const [tokenReady, setTokenReady] = useState(false)

  const url = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    (async () => {
      if (tokenReady) {
        const response = await fetch(`${url}/healthcare`, {
          headers: {
            'Content-type': "application/json",
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })

        const data = await response.json()
        setVet(data.healthcare_facilities)
        setIsLoading(false)
      }
    })()
  }, [tokenReady])

  useEffect(() => {
    if (token) setTokenReady(true)
  }, [token])

  return !isLoading ? (
    <>
      <Navbar title={true}>Healthcare Facility</Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <Searchbar input={input} setInput={setInput} />
        <div className="flex flex-row flex-wrap justify-between gap-3 mt-10">
        {vet && (
          vet.map((v) => {
            return <BookingBlock vet={v}/>
          })
        )}
        </div>
      </div>
    </>
  ) : (
    <LoadSpinner />
  )
}
