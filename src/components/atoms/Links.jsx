import Link from "next/link";

export default function Links({ link, current }) {
  return (
    <Link
      href={`${link.href}`}
      className="text-md font-bold text-gray-800 relative hover:after:border-primary-500 hover:after:w-full hover:after:absolute hover:after:bottom-[-14px] hover:after:border-b-[3px]"
    >
      <div className={`${current === link.label && 'text-primary-500'}`} >{link.label}</div>
      {current === link.label && (
        <div className="absolute bottom-[-14px] w-full border-b-[3px] border-primary-500"></div>
      )}
    </Link>
  );
}
