import Link from "next/link";

export default function Links({ link, current }) {
  return (
    <Link
      href={`${link.href}`}
      className="text-2xl font-bold text-gray-800 relative hover:first:after:border-[#6A75ED] hover:first:after:w-full hover:first:after:absolute hover:first:after:bottom-[-14px] hover:first:after:border-b-[3px]"
    >
      <div>{link.label}</div>
      {current === link.label && (
        <div className="absolute bottom-[-14px] w-full border-b-[3px] border-[#6A75ED]"></div>
      )}
    </Link>
  );
}
