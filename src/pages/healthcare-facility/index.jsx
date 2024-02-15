import Navbar from "@/components/organisms/Navbar";
import Searchbar from "@/components/molecules/Searchbar";
import BookingBlock from "@/components/molecules/BookingBlock";
import { useState, useEffect } from "react";
import LoadSpinner from "@/components/atoms/LoadSpinner";

export default function Veterinary() {
  const [results, setResults] = useState([])
  const [vet, setVet] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const url = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    (async () => {
      const response = await fetch(`${url}/healthcare`)
      const data = await response.json()

      setVet(data.healthcare_facilities)
      setResults(data.healthcare_facilities)
      setIsLoading(false)
    })()
  }, [])

  return !isLoading ? (
    <>
      <Navbar title={true}>Healthcare Facility</Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <Searchbar results={results} setResult={setResults} data={vet} />
        <div className="flex flex-row flex-wrap justify-left gap-3 mt-10 w-full mx-auto">
        {results && (
          results.map((vet) => {
            return <BookingBlock key={vet.user_id} vet={vet}/>
          })
        )}
        </div>
      </div>
    </>
  ) : (
    <LoadSpinner />
  )
}
