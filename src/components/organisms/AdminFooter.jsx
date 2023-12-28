import Image from "next/image"
import Logo from "../../../public/logo.svg"
import Pethub from "../../../public/Pethub.svg"

export default function AdminFooter() {
  return (
    <footer className="p-4 bg-white sm:p-6">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://flowbite.com" className="flex items-center">
              <Image src={Logo} className="mr-3 h-8" alt="FlowBite Logo" width={50} height={50} />
              <Image src={Pethub} alt="Pethub" width={80} height={80} />
            </a>
          </div>
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com" className="hover:underline">Pethub™</a>. All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
