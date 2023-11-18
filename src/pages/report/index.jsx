import Navbar from "@/components/organisms/Navbar"
import BackButton from "@/components/atoms/BackButton"
import Table from "@/components/organisms/Table"
import AdminFooter from "@/components/organisms/AdminFooter"

export default function Report() {
  return (
    <>
      <Navbar></Navbar> 
      <div className="w-full m-auto pt-6 px-6">
        <BackButton/>
        <div className="w-full mt-8 m-auto py-11 px-16">
          <div className="flex flex-col">
            <div className="text-2xl mx-auto font-bold">Reports</div>
            <Table />
          </div>
        </div>
      </div>
    </>
  )
}

Report.getLayout = function getLayout(page) {
  return (
    <main>
      {page}
      <AdminFooter />
    </main>
  )
}
