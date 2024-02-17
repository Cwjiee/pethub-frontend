import DashboardBlock from "@/components/atoms/DashboardBlock";
import SPFooter from "@/components/organisms/SPFooter";
import SPNavbar from "@/components/organisms/SPNavbar";
import ServiceProvider from "@/../public/svg/ServiceProvider.svg"
import PetNews from "@/../public/svg/PetNews.svg"
import Users from "@/../public/svg/Users.svg"
import Forums from "@/../public/svg/Forums.svg"
import { v4 } from "uuid";
import checkAuth from "@/utils/checkAuth";


function ServiceProviderDashBoard() {
  const dirs = [
    {
      links: "/service-providers/appointments",
      label: "Appointment Applications",
      image: ServiceProvider,
    },
    {
      links: "/service-providers/news",
      label: "News",
      image: PetNews,
    },
    {
      links: "/service-providers/forums",
      label: "Forums",
      image: Forums,
    },
    {
      links: "/service-providers/profile",
      label: "Profile",
      image: Users,
    },
  ]

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <SPNavbar title={true}>Dashboard</SPNavbar>
        <div className="w-full m-auto pt-10 pb-14 px-16 bg-[#F3F4F6]">
          <div className="w-4/5 m-auto text-center">
            <div className="text-2xl font-bold">Service Provider Dashboard</div>
            <div className="grid grid-cols-3 grid-flow-row gap-10 mt-5">
              {dirs.map((dir) => {
                return (
                  <DashboardBlock key={v4()} links={dir.links} label={dir.label} image={dir.image}/>
                )
              })}
            </div>
          </div>
        </div>
        <SPFooter/>
      </div>
    </>
  )
}

ServiceProviderDashBoard.getLayout = function getLayout(page) {
  return (
    <>
      <main>
        {page}
      </main>
    </>
  )
}

export default checkAuth(ServiceProviderDashBoard)
