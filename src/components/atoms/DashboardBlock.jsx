import Image from "next/image";
import { useRouter } from "next/router";

export default function DashboardBlock({ links, label, image }) {
  const router = useRouter()

  const handleRoute = () => {
    router.push(links)
  }

  return (
    <div
      className="bg-white w-full rounded-[10px] shadow-lg flex flex-col items-center cursor-pointer p-12 active:shadow-[0_0_10px_0_rgba(0,0,0,0.3),0_0_15_0_rgba(0,0,0,0.5)]"
      onClick={handleRoute}
    >
      <Image src={image} alt={label} />
      <div className="text-[16px] font-bold">{label}</div>
    </div>
  )
}
