import Link from "next/link";
import Image from "next/image";
import { v4 } from "uuid";
import Pethub from "../../../public/svg/purplePethubLogo.svg"

export default function LandingNavbar() {
  const links = [
    // {
    //   href: "/about",
    //   label: "About Us",
    // },
    // {
    //   href: "/contact",
    //   label: "Contact",
    // },
    // {
    //   href: "/support",
    //   label: "Support",
    // },
    {
      href: "/login",
      label: "Login",
    }
  ];

  return (
    <header>
      <nav className="mx-auto w-[95%] flex items-center justify-between px-5 pt-[44px] text-white">
        <Image src={Pethub} alt="pethub logo" />
        <div className="flex gap-x-12 justify-center items-center font-semibold">
          {links.map((link) => {
            return (
              <Link
                key={v4()}
                href={`${link.href}`}
                className={`${link.label === "Login" && 'text-md relative border-[4px] border-white px-[50px] py-3 rounded-2xl hover:bg-white hover:text-primary-500'}`}
              >
                <div>{link.label}</div>
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  );
}
