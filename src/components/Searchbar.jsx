import Image from "next/image";

export default function Searchbar({ input }) {
  return (
    <div className="flex justify-between h-[60px]">
      <input
        className="w-[85%] bg-white rounded-[10px] px-8 py-2 outline-none focus:border-4 focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
        style={{
          boxShadow:
            "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
        }}
        placeholder="Search..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <a className="flex justify-around px-6 w-[12%] bg-[#6A75ED] rounded-[10px]">
        <Image src="/add.svg" alt="add" width={30} height={30} />
        <span className="my-auto text-white font-bold spacing tracking-[0.86px] text-lg">
          New Post
        </span>
      </a>
    </div>
  );
}
