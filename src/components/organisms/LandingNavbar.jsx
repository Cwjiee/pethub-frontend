import Link from "next/link";
import Image from "next/image";
import { v4 } from "uuid";
import Logo from "../../../public/svg/purpleLogo.svg";
import Pethub from "../../../public/svg/purplePethub.svg";

export default function LandingNavbar() {
  const links = [
    {
      href: "/about",
      label: "About Us",
    },
    {
      href: "/contact",
      label: "Contact",
    },
    {
      href: "/support",
      label: "Support",
    },
    {
      href: "/login",
      label: "Login",
    }
  ];

  return (
    <header>
      <nav className="mx-auto w-[80%] flex items-center justify-between px-5 pt-[44px] text-white">
        <div className="flex gap-x-2">
          <Image src={Logo} alt="logo" width={34} height={34} />
          <Image src={Pethub} alt="pethub" width={83} height={83} />
        </div>
        <div className="flex gap-x-12 justify-center items-center">
          {links.map((link) => {
            return (
              <Link
                key={v4()}
                href={`${link.href}`}
                className={`${link.label === "Login" && 'text-md relative border-[3px] border-white px-12 py-3 rounded-xl'}`}
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
