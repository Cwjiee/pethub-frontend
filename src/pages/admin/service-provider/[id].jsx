import AdminNavbar from "@/components/organisms/AdminNavbar"
import AdminFooter from "@/components/organisms/AdminFooter"
import { useRouter } from "next/router"
import BackButton from "@/components/atoms/BackButton" 
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context"
import { useToast } from "@chakra-ui/react"
import LoadSpinner from "@/components/atoms/LoadSpinner"
import TimeConvert from "@/utils/TimeConvert"

export default function ServiceProviderDetails() {
  const router = useRouter()
  const toast = useToast()
  const { token } = useContext(GlobalContext)
  const [user, setUser] = useState({})
  const [tokenReady, setTokenReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [time, setTime] = useState({})
  const spId = router.query.id

  const url = process.env.NEXT_PUBLIC_ADMIN_API_URL

  useEffect(() => {
    if (token && spId) {
      setTokenReady(true)
    }
  }, [token, spId])

  useEffect(() => {
    (async () => {
      if (tokenReady) {
        const response = await fetch(`${url}/sp_application/${spId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          }
        })

        const result = await response.json()
        setUser(result.user)
        setIsLoading(false)
      }
    })()
  }, [tokenReady])

  useEffect(() => {
    if (!isLoading) {
      timeBlock(user.opening_hour, user.closing_hour)
    }
  }, [user])

  const timeBlock = (openTimeString, closeTimeString) => {
    setTime(TimeConvert(openTimeString, closeTimeString))
  }


  const handleSubmit = async (application) => {

    const response = await fetch(`${url}/sp_application/${spId}`, {
      method: "PUT",
      body: JSON.stringify({
        user_status: application,
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      },
    })
    const result = await response.json()
    console.log(result)

    if (response.ok) {
      toast({
        title: 'Success',
        description: 'News status updated',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      router.push('/admin/service-provider')
    } else {
      toast({
        title: 'Error',
        description: 'Failed in updating service provider status',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return !isLoading ? (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <AdminNavbar />
        <div className="w-full m-auto mb-20 flex-auto pt-6 px-16 bg-[#F3F4F6]">
          <BackButton/>
          {user && 
            <div>
              <div className="flex justify-center items-center mb-5">
                <div className="flex flex-row gap-x-4">
                  <button onClick={() => handleSubmit('approved')} className="flex justify-around px-6 py-[10px] rounded-[10px] bg-[#22C55E] w-[160px] text-sm font-bold">
                    <div className="my-auto text-white font-bold spacing tracking-[0.86px] text-md">
                      Accept
                    </div>
                  </button>
                  <button onClick={() => handleSubmit('rejected')} className="flex justify-around px-6 py-[10px] rounded-[10px] bg-[#EF4444] w-[160px] text-sm font-bold">
                    <div className="my-auto text-white font-bold spacing tracking-[0.86px] text-md">
                      Reject
                    </div>
                  </button>
                </div>
              </div>
              <div className="w-[60%] mx-auto bg-white mt-6 pt-20 pb-10 px-24 flex flex-col justify-center items-left gap-y-6 shadow-lg rounded-[10px]">
                <div className="flex flex-col gap-y-1">
                  <div>Facility Name:</div>
                  <div className="text-[#555555]">{user.full_name}</div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <div>Facility Email:</div>
                  <div className="text-[#555555]">{user.email}</div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <div>Service Type:</div>
                  <div className="text-[#555555]">{user.service_type}</div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <div>Facility Description:</div>
                  <div className="text-[#555555]">{user.description}</div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <div>Contact Number:</div>
                  <div className="text-[#555555]">{user.contact_number}</div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <div>Operating Hours:</div>
                  <div className="text-[#555555]">{`${time.openTime} to ${time.closeTime}`}</div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <div>Bank name:</div>
                  <div className="text-[#555555]">{user.bank_name}</div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <div>Beneficiary account number:</div>
                  <div className="text-[#555555]">{user.beneficiary_acc_number}</div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <div>Beneficiary name:</div>
                  <div className="text-[#555555]">{user.beneficiary_name}</div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <div>Deposit Value:</div>
                  <div className="text-[#555555]">{`RM ${user.deposit_value.toFixed(2)}`}</div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <div>QR Code Image:</div>
                  <img src={user.qr_code_image} width={200} height={'auto'} alt="qr code image" />
                </div>
                {user.certificate && (
                  <div className="flex flex-col gap-y-1">
                    <div>Resume:</div>
                    <div></div>
                  </div>
                )}
              </div>
            </div>
          }
        </div>
        <AdminFooter />
      </div>
    </>
  ) : (
      <LoadSpinner />
    )
}

ServiceProviderDetails.getLayout = function getLayout(page) {
  return (
    <>
      <main>
        {page}
      </main>
    </>
  )
}
