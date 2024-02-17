import BackButton from "@/components/atoms/BackButton"
import ReportTable from "@/components/organisms/ReportTable"
import AdminFooter from "@/components/organisms/AdminFooter"
import AdminNavbar from "@/components/organisms/AdminNavbar"
import checkAuth from "@/utils/checkAuth"

function Report() {
  return (
    <>
      <div className="flex flex-col justify-start min-h-screen">
        <AdminNavbar />
        <div className="w-full h-auto flex-auto pt-6 px-16 bg-[#F3F4F6]">
          <BackButton/>
          <div className="w-full m-auto py-11">
            <div className="flex flex-col">
              <div className="text-2xl mx-auto font-bold">Reports</div>
              <ReportTable />
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </>
  )
}

Report.getLayout = function getLayout(page) {
  return (
    <main>
      {page}
    </main>
  )
}

export default checkAuth(Report)
