import Image from "next/image"
import AccImage from "../../../public/svg/accountPending.svg"
import { useRouter } from "next/router"

export default function Status() {
  const router = useRouter()

  const handleRoute = () => {
    router.push('/')
    return
  }

  return (
    <>
      <div className="h-screen m-auto flex justify-center items-center">
        <div className="p-10 bg-white flex flex-col items-center w-2/6 gap-5 rounded-[10px] shadow-[0px_4px_6px_-2px_rgba(0,0,0,0.05),0px_10px_15px_-3px_rgba(0,0,0,0.10)] active:shadow-[0_0_10px_0_rgba(0,0,0,0.3),0_0_15_0_rgba(0,0,0,0.5)]"> 
          <div className="text-2xl font-bold">Account is Pending!</div>
          <Image src={AccImage} alt="account-pending" />
          <div className="text-balance px-12 text-center">
            Account has been made.
            It will need to approve by our administrators before it is made public.
            Please wait for 1 or 2 days to receive the confirmation email.
          </div>
          <button
            className="mx-auto rounded-[10px] text-white flex justify-center items-center hover:cursor-pointer w-3/4 px-6 py-3 bg-primary-500 hover:bg-primary-600 active:bg-primary-700"
            style={{
              boxShadow:
                "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
            }}
            onClick={handleRoute}
          >
            Back to Front Page
          </button>
        </div>
      </div>
    </>
  )
}

Status.getLayout = function getLayout(page) {
  return (
    <main className="bg-[#F3F4F6]">
      {page}
    </main>
  )
}
