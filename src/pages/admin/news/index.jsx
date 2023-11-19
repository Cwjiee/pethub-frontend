import AdminNavbar from "@/components/organisms/AdminNavbar"
import AdminFooter from "@/components/organisms/AdminFooter"
import BackButton from "@/components/atoms/BackButton"
import NewsTable from "@/components/organisms/NewsTable"

export default function AdminNews() {
  return (
    <>
      <AdminNavbar />
      <div className="w-full m-auto pt-6 px-16">
        <BackButton/>
        <div className="w-full mt-8 m-auto py-11">
          <div className="flex flex-col">
            <div className="text-2xl mx-auto font-bold">News</div>
          </div>
          <NewsTable />
        </div>
      </div>
    </>
  )
}

AdminNews.getLayout = function getLayout(page) {
  return (
    <main>
      {page}
      <AdminFooter />
    </main>
  )
}
