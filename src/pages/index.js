import LandingNavbar from "@/components/organisms/LandingNavbar"
import Image from "next/image"
import Hamster from "../../public/svg/hamster.svg"
import Collar from "../../public/svg/collar.svg"
import Dog from "../../public/svg/dog.svg"
import Footprints from "../../public/svg/footprints.svg"
import Pug from "../../public/svg/pug.svg"
import Cat from "../../public/svg/cat.svg"

export default function Home() {
  return (
    <main className='w-screen h-[100vh] relative' style={{'background': 'linear-gradient(180deg, #6873EC 0%, #3341DB 100%)'}}>
      <LandingNavbar />
      <Image src={Hamster} alt="hamster" className="absolute top-0 left-[35%]" />
      <Image src={Collar} alt="collar" className="absolute left-0 top-[20%]" />
      <Image src={Dog} alt="dog" className="absolute right-0 top-[25%]" />
      <Image src={Footprints} alt="footprints" className="absolute right-[10%] bottom-0" />
      <Image src={Pug} alt="pug" className="absolute left-[25%] bottom-0" />
      <Image src={Cat} alt="cat" className="absolute left-0 bottom-[2%]" />
      <div className="flex flex-col gap-9 m-auto w-[55%] justify-center items-center">
        <div className="m-auto mt-32 text-center text-6xl font-bold text-white leading-normal">
          Always Choose The Better Way For Your Pets
        </div>
        <button 
          className="bg-white rounded-xl sm:w-48 px-7 py-3 font-semibold text-xl"
          style={{
            "boxShadow": "rgba(184,190,255,255) 5px 7px;"
          }}
        >
          Sign Up
        </button>
      </div>
      </main>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <main>
      {page}
    </main>
  )
}
