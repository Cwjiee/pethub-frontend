import Image from "next/image";

export default function Searchbar({ input, setInput, label }) {
  return (
    <div className="flex justify-between h-[40px] w-full">
      <input
        className="w-[83%] bg-white rounded-[10px] px-8 p-2 outline-none focus:border-4 focus:border-blue-500 focus:ring-blue-500 placeholder:text-md"
        style={{
          boxShadow:
            "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
        }}
        placeholder="Search..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <a className="flex justify-around px-5 w-[15%] bg-[#6A75ED] rounded-[10px]">
        <Image src="/add.svg" alt="add" width={20} height={20} />
        <span className="my-auto text-white font-bold spacing tracking-[0.86px] text-md">
          {label}
        </span>
      </a>
    </div>
  );
}
