import AdminNavbar from "@/components/organisms/AdminNavbar"
import AdminFooter from "@/components/organisms/AdminFooter"
import BackButton from "@/components/atoms/BackButton"
import UserTable from "@/components/organisms/UserTable"

export default function AdminUser() {
  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <AdminNavbar />
        <div className="w-full m-auto flex-auto pt-6 px-16 bg-[#F3F4F6]">
          <BackButton/>
          <div className="w-full m-auto py-8">
            <div className="flex flex-col">
              <div className="text-2xl mx-auto font-bold">Users</div>
              <UserTable />
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </>
  )
}

AdminUser.getLayout = function getLayout(page) {
  return (
    <>
      <main>
        {page}
      </main>
    </>
  )
}
