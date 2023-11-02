import BackButtonIcon from "../../../public/svg/BackButton.svg"
import { useRouter } from "next/router"
import Image from "next/image"

export default function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="flex flex-row gap-2 items-center hover:cursor-pointer" onClick={handleBack}>
      <Image className="w-6 h-6" src={BackButtonIcon} alt="back-button"/>
      <span className="text-base text-secondary-500 font-semibold">Back</span>
    </div>
  )
}
