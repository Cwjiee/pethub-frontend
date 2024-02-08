import Links from "../atoms/Links";
import Image from "next/image";
import { useRouter } from "next/router";
import { v4 } from "uuid";

export default function SPNavbar({ children, title }) {
  const router = useRouter()
  const links = [
    {
      href: "/service-providers/dashboard",
      label: "Dashboard" 
    },
    {
      href: "/service-providers/news",
      label: "Pet News",
    },
    {
      href: "/service-providers/appointments",
      label: "Appointments",
    },
    {
      href: "/service-providers/forums",
      label: "Forums",
    }
  ];

  const goToProfile = () => {
    router.push("/profile")
  }

  return (
    <header className="bg-white">
      <nav className="mx-auto w-[80%] flex items-center justify-between py-4">
        <div className="flex gap-x-2">
          <Image src="/logo.svg" alt="logo" width={34} height={34} />
          <Image src="/Pethub.svg" alt="pethub" width={83} height={83} />
        </div>
        <div className="flex gap-x-12">
          {links.map((link) => {
            return <Links key={v4()} link={link} current={children} />;
          })}
        </div>
        <div className="flex hover:cursor-pointer" onClick={goToProfile}>
          <svg
            width="37"
            height="37"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25" r="25" fill="#6A75ED" />
            <g clipPath="url(#clip0_149_11)">
              <path
                d="M30.25 18.75C30.25 20.1424 29.6969 21.4777 28.7123 22.4623C27.7277 23.4469 26.3924 24 25 24C23.6076 24 22.2723 23.4469 21.2877 22.4623C20.3031 21.4777 19.75 20.1424 19.75 18.75C19.75 17.3576 20.3031 16.0223 21.2877 15.0377C22.2723 14.0531 23.6076 13.5 25 13.5C26.3924 13.5 27.7277 14.0531 28.7123 15.0377C29.6969 16.0223 30.25 17.3576 30.25 18.75ZM14.5 32.75C14.5 34.5 16.25 34.5 16.25 34.5H25.448C25.1505 33.6568 24.999 32.7691 25 31.875C24.9988 30.7495 25.2395 29.6369 25.7057 28.6125C26.1718 27.588 26.8526 26.6757 27.702 25.9373C26.8848 25.8165 25.987 25.75 25 25.75C16.25 25.75 14.5 31 14.5 32.75ZM31.8005 26.555C32.1155 25.4823 33.6345 25.4823 33.9513 26.555L34.0265 26.814C34.0735 26.9747 34.1559 27.1227 34.2677 27.2474C34.3795 27.372 34.5177 27.4699 34.6724 27.5341C34.827 27.5982 34.994 27.6269 35.1612 27.6179C35.3283 27.609 35.4913 27.5627 35.6383 27.4825L35.8763 27.353C36.858 26.8175 37.9325 27.892 37.3988 28.8738L37.2675 29.1118C37.1876 29.2586 37.1416 29.4215 37.1328 29.5884C37.1241 29.7554 37.1528 29.9221 37.2169 30.0765C37.281 30.2309 37.3789 30.369 37.5033 30.4807C37.6277 30.5923 37.7756 30.6747 37.936 30.7218L38.1968 30.8005C39.2678 31.1155 39.2678 32.6345 38.1968 32.9513L37.9343 33.0265C37.7739 33.0739 37.6262 33.1566 37.502 33.2685C37.3778 33.3805 37.2802 33.5188 37.2164 33.6734C37.1526 33.828 37.1243 33.9948 37.1334 34.1618C37.1426 34.3288 37.189 34.4916 37.2693 34.6383L37.3988 34.8763C37.9325 35.858 36.858 36.9325 35.8763 36.3988L35.6383 36.2675C35.4914 36.1876 35.3285 36.1416 35.1616 36.1328C34.9946 36.1241 34.8279 36.1528 34.6735 36.2169C34.5191 36.281 34.381 36.3789 34.2693 36.5033C34.1577 36.6277 34.0753 36.7756 34.0283 36.936L33.9495 37.1968C33.6345 38.2678 32.1155 38.2678 31.7988 37.1968L31.7235 36.9343C31.6761 36.7739 31.5934 36.6262 31.4815 36.502C31.3695 36.3778 31.2312 36.2802 31.0766 36.2164C30.922 36.1526 30.7552 36.1243 30.5882 36.1334C30.4212 36.1426 30.2584 36.189 30.1118 36.2693L29.8738 36.3988C28.892 36.9325 27.8175 35.858 28.3513 34.8763L28.4825 34.6383C28.5624 34.4914 28.6084 34.3285 28.6172 34.1616C28.6259 33.9946 28.5972 33.8279 28.5331 33.6735C28.469 33.5191 28.3711 33.381 28.2467 33.2693C28.1223 33.1577 27.9744 33.0753 27.814 33.0283L27.555 32.9495C26.4823 32.6345 26.4823 31.1155 27.555 30.7988L27.814 30.7235C27.9747 30.6765 28.1227 30.5941 28.2474 30.4823C28.372 30.3705 28.4699 30.2323 28.5341 30.0777C28.5982 29.923 28.6269 29.756 28.6179 29.5888C28.609 29.4217 28.5627 29.2587 28.4825 29.1118L28.353 28.8738C27.8175 27.892 28.892 26.8175 29.8738 27.3513L30.1118 27.4825C30.2586 27.5624 30.4215 27.6084 30.5884 27.6172C30.7554 27.6259 30.9221 27.5972 31.0765 27.5331C31.2309 27.469 31.369 27.3711 31.4807 27.2467C31.5923 27.1223 31.6747 26.9744 31.7218 26.814L31.8005 26.555ZM35.5 31.875C35.5 31.5303 35.4321 31.1889 35.3002 30.8705C35.1683 30.552 34.9749 30.2626 34.7312 30.0188C34.4874 29.7751 34.198 29.5817 33.8795 29.4498C33.5611 29.3179 33.2197 29.25 32.875 29.25C32.5303 29.25 32.1889 29.3179 31.8705 29.4498C31.552 29.5817 31.2626 29.7751 31.0188 30.0188C30.7751 30.2626 30.5817 30.552 30.4498 30.8705C30.3179 31.1889 30.25 31.5303 30.25 31.875C30.25 32.5712 30.5266 33.2389 31.0188 33.7312C31.5111 34.2234 32.1788 34.5 32.875 34.5C33.5712 34.5 34.2389 34.2234 34.7312 33.7312C35.2234 33.2389 35.5 32.5712 35.5 31.875Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_149_11">
                <rect
                  width="28"
                  height="28"
                  fill="white"
                  transform="translate(11 10)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </nav>
      <hr />
      {title && (
        <div className="mx-auto w-[80%] px-5 py-2">
          <h1 className="text-xl font-bold text-gray-800">{children}</h1>
        </div>
      )}
    </header>
  );
}
