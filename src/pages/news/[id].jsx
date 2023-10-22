import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "@/components/organisms/Navbar";
import BackButton from "../../../public/svg/BackButton.svg"
import NewsPlaceholder from "../../../public/png/NewsPlaceholder.png";

export default function NewsPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push("/news")
  }

  return (
    <>
      <Navbar title={false}>Pet News</Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <div className="flex flex-row gap-1 items-center hover:cursor-pointer" onClick={handleBack}>
          <Image className="w-6 h-6" src={BackButton} alt="back-button"/>
          <span className="text-base text-secondary-500 font-semibold">Back</span>
        </div>

        <div className="mt-7 flex flex-row gap-12 w-full">
          <Image height={470} width={427} src={NewsPlaceholder} alt="news-image"/>
          <div className="flex flex-col w-[65%]">
            <h4 className="font-bold text-2xl mr-auto">Doggo Event At Bukit Gasing</h4>
            <div className="mr-auto mt-4 flex justify-center items-center">
              <div className="py-[6px] px-6 text-center text-neutral-800 text-sm font-bold font-['Nunito'] rounded-[40px] border border-neutral-300">
                Events
              </div>
            </div>
            <div className="mt-8">
              <div>Time: 8am - 5pm</div>
              <div>Venue: IOI City Mall</div>
              <div>Other details: Free Parking Provided!</div>
              <div>Contact Number: 012-2345678</div>
            </div>
            <div className="mt-8">
              Join us for a fun-filled day at the local park, a vibrant and lively oasis of green nestled within our bustling city. This event promises an extraordinary day for dogs of all shapes and sizes, where they can frolic, romp, and play to their heart&apos;s content, creating lasting memories and fostering their boundless canine camaraderie. We&apos;re rolling out the red carpet for your four-legged companions, ensuring a paw-some experience for both pets and their devoted human companions.
            </div>
            <div className="mt-8">
              The park, bathed in warm sunlight and adorned with flourishing trees, provides the perfect setting for this delightful occasion. It&apos;s a haven where dogs can bask in the freedom of wide-open spaces, their tails wagging with unbridled joy as they embark on exciting adventures. With lush, emerald grass underfoot and the rustling leaves overhead, the park becomes a canine playground like no other.
            </div>
          </div>
        </div>
      </div>
    </>
  )  
}
