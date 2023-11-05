import Navbar from "@/components/organisms/Navbar"
import BackButton from "@/components/atoms/BackButton"
import data from "../../../data/report.json"
import { v4 } from "uuid"

export default function Report() {
  return (
    <>
      <Navbar></Navbar> 
      <div className="w-[80%] m-auto pt-6 px-6">
        <BackButton/>
        <div className="w-full mt-8 m-auto py-11 px-16 bg-white">
          <div className="flex flex-col">
            <div className="text-2xl">Report</div>
            <div className="grid grid-cols-[3fr_4fr_2fr_1fr]">
              <div>Report Title</div>
              <div>Report Description</div>
              <div>Full Name</div>
              <div></div>
              {data.data.map((x) => {
                return (
                  <div key={v4()} className="grid grid-cols-[3fr_4fr_2fr_1fr]">
                    <div>{x.title}</div>
                    <div>{x.description}</div>
                    <div>{x.full_name}</div>
                  </div>
                )
              })};
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
