import AdminNavbar from "@/components/organisms/AdminNavbar"
import AdminFooter from "@/components/organisms/AdminFooter"
import BackButton from "@/components/atoms/BackButton"
import ServiceProviderApplicationTable from "@/components/organisms/ServiceProviderApplicationTable"
export default function AdminServiceProvider() {
  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <AdminNavbar />
        <div className="w-full m-auto flex-auto pt-6 px-16 bg-[#F3F4F6]">
          <BackButton/>
          <div className="w-full m-auto py-11">
            <div className="flex flex-col">
              <div className="text-2xl mx-auto font-bold">Pet Service Provider Applications</div>
              <ServiceProviderApplicationTable />
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </>
  )
}

AdminServiceProvider.getLayout = function getLayout(page) {
  return (
    <>
      <main>
        {page}
      </main>
    </>
  )
}
