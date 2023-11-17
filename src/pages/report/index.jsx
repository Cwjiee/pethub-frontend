import Navbar from "@/components/organisms/Navbar"
import BackButton from "@/components/atoms/BackButton"
import Table from "@/components/organisms/Table"

export default function Report() {
  return (
    <>
      <Navbar></Navbar> 
      <div className="w-full m-auto pt-6 px-6">
        <BackButton/>
        <div className="w-full mt-8 m-auto py-11 px-16 bg-white">
          <div className="flex flex-col">
            <div className="text-2xl">Report</div>
            <Table />
          </div>
        </div>
      </div>
    </>
  )
}
