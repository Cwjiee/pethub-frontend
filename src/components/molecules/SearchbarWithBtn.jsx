import Image from "next/image";
import Link from "next/link";
import Fuse from 'fuse.js'

export default function SearchbarWithBtn({ setResult, label, href, results, data }) {

  const handleSearch = (pattern) => {
    if (!pattern || !href) {
      setResult(data)
      console.log('nope')
      return
    }

    const type = label.split(" ")[1].toLowerCase()

    const fuse = new Fuse(data, {
      keys: [`${type}_title`],
    })

    const result = fuse.search(pattern)
    const matches = []
    if (!results.length) {
      setResult(data)
    } else {
      result.forEach(({item}) => {
        matches.push(item)
      })
      setResult(matches)
    }
  }

  return (
    <div className="flex justify-between h-[40px] w-full">
      <input
        className="w-[83%] bg-white rounded-[10px] px-8 p-2 outline-none focus:border-4 focus:border-blue-500 focus:ring-blue-500 placeholder:text-md"
        style={{
          boxShadow:
            "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
        }}
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Link href={href} className="flex justify-around px-5 w-[15%] rounded-[10px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700">
        <Image src="/add.svg" alt="add" width={20} height={20} />
        <div className="my-auto text-white font-bold spacing tracking-[0.86px] text-md">
          {label}
        </div>
      </Link>
    </div>
  );
}
