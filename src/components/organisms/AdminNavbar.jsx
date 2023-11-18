import Image from "next/image"

export default function AdminNavbar() {
  return (
    <>
      <header className="bg-white">
        <nav className="mx-auto w-[90%] flex items-center justify-between py-4">
          <div className="flex gap-x-2">
            <Image src="/logo.svg" alt="logo" width={34} height={34} />
            <Image src="/Pethub.svg" alt="pethub" width={83} height={83} />
          </div>
          <div className="flex gap-x-6 items-center">
            <div>Admin Mode</div>
            <button className="flex justify-around px-12 py-3 rounded-[10px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700">
              <div className="my-auto text-white font-bold spacing tracking-[0.86px] text-md">
                Logout
              </div>
            </button>
          </div>
        </nav>
      </header>
    </>
  )
}
