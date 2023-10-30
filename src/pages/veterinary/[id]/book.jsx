import Navbar from "@/components/organisms/Navbar"
import BackButton from "@/components/atoms/BackButton"
import { v4 } from "uuid"

export default function Book() {
  const route = "/veterinary"
  const pets = [
    "Pet A",
    "Pet B",
    "Pet C",
  ]

  return (
    <>
      <Navbar title={false}>Veterinary</Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <BackButton route={route} />
      </div>
      <div className="w-[35%] mt-12 m-auto py-11 px-24 bg-white">
        <div className="flex flex-col gap-16">
          <div className="text-xl font-bold text-center">Select which pet would you like to make an appointment for</div> 
          <div className="flex flex-col gap-2">
            {pets.map((pet) => {
              return (
                <div key={v4()} class="flex items-center">
                  <input id="checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{pet}</label>
                </div>
              )
            })}
          </div>
          <button className="w-full h-10 rounded-[10px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white cursor-pointer">Next</button>
        </div>
      </div>
    </>
  )
}
