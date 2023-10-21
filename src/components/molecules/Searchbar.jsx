export default function Searchbar({ input, setInput, label }) {
  return (
    <div className="flex justify-between h-[45px] w-full">
      <input
        className="w-full bg-white rounded-[10px] px-8 p-2 outline-none focus:border-4 focus:border-blue-500 focus:ring-blue-500 placeholder:text-md"
        style={{
          boxShadow:
            "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
        }}
        placeholder="Search..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}
