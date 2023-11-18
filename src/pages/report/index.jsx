import BackButton from "@/components/atoms/BackButton"
import Table from "@/components/organisms/Table"
import AdminFooter from "@/components/organisms/AdminFooter"
import AdminNavbar from "@/components/organisms/AdminNavbar"

export default function Report() {
  return (
    <>
      <AdminNavbar />
      <div className="w-full m-auto pt-6 px-16">
        <BackButton/>
        <div className="w-full mt-8 m-auto py-11">
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
