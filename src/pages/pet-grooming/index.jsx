import Navbar from "@/components/organisms/Navbar";
import Searchbar from "@/components/molecules/Searchbar";
import BookingBlock from "@/components/molecules/BookingBlock";
import { useState, useEffect } from "react";
import LoadSpinner from "@/components/atoms/LoadSpinner";
import Footer from "@/components/organisms/Footer";

export default function PetGrooming() {
  const [results, setResults] = useState([])
  const [groom, setGroom] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const url = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    (async () => {
      const response = await fetch(`${url}/grooming`)
      const data = await response.json()

      setGroom(data.grooming)
      setResults(data.grooming)
      setIsLoading(false)
    })()
  }, [])

  return !isLoading ? (
    <>
      <Navbar title={true}>Pet Grooming</Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <Searchbar results={results} setResult={setResults} data={groom} />

        <div className="flex flex-row flex-wrap justify-left gap-3 mt-10 w-full mx-auto">
        {results && (
          results.map((groom) => {
            return <BookingBlock service={"pet-grooming"} key={groom.user_id} vet={groom}/>
          })
        )}
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <LoadSpinner />
  )
}
