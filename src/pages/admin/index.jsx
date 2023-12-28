import AdminFooter from "@/components/organisms/AdminFooter";
import AdminNavbar from "@/components/organisms/AdminNavbar";
import DashboardBlock from "@/components/atoms/DashboardBlock";
import ServiceProvider from "@/../public/svg/ServiceProvider.svg"
import PetNews from "@/../public/svg/PetNews.svg"
import Reports from "@/../public/svg/Reports.svg"
import Users from "@/../public/svg/Users.svg"
import Forums from "@/../public/svg/Forums.svg"
import { v4 } from "uuid";

export default function AdminIndex() {
  const dirs = [
    {
      links: "admin/service-provider",
      label: "Pet Service Provider Applications",
      image: ServiceProvider,
    },
    {
      links: "admin/news",
      label: "News",
      image: PetNews,
    },
    {
      links: "admin/report",
      label: "Reports",
      image: Reports,
    },
    {
      links: "admin/users",
      label: "Users",
      image: Users,
    },
    {
      links: "admin/forums",
      label: "Forums",
      image: Forums,
    },
  ]

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <AdminNavbar />
        <div className="w-full m-auto pt-10 pb-14 px-16 bg-[#F3F4F6]">
          <div className="w-4/5 m-auto text-center">
            <div className="text-2xl font-bold">Admin Dashboard</div>
            <div className="grid grid-cols-3 grid-flow-row gap-10 mt-5">
              {dirs.map((dir) => {
                return (
                  <DashboardBlock key={v4()} links={dir.links} label={dir.label} image={dir.image}/>
                )
              })}
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </>
  )
}

AdminIndex.getLayout = function getLayout(page) {
  return (
    <>
      <main>
        {page}
      </main>
    </>
  )
}
