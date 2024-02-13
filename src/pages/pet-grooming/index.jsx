import Navbar from "@/components/organisms/Navbar";
import Searchbar from "@/components/molecules/Searchbar";
import BookingBlock from "@/components/molecules/BookingBlock";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "@/context";
import LoadSpinner from "@/components/atoms/LoadSpinner";

export default function PetGrooming() {
  const [results, setResults] = useState([])
  const [groom, setGroom] = useState([])
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
        setResults(data.grooming)
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
        <Searchbar results={results} setResult={setResults} data={groom} />

        <div className="flex flex-row flex-wrap justify-left gap-[19px] mt-10 w-full mx-auto">
        {results && (
          results.map((groom) => {
            return <BookingBlock key={groom.user_id} vet={groom}/>
          })
        )}
        </div>
      </div>
    </>
  ) : (
    <LoadSpinner />
  )
}
