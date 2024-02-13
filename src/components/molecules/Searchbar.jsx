import Fuse from "fuse.js"

export default function Searchbar({ setResult, results, data }) {

  const handleSearch = (pattern) => {
    if (!pattern) {
      setResult(data)
      console.log('couldn\' search')
      return
    }

    const fuse = new Fuse(data, {
      keys: ['full_name'],
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
    <div className="flex justify-between h-[45px] w-full">
      <input
        className="w-full bg-white rounded-[10px] px-8 p-2 outline-none focus:border-4 focus:border-blue-500 focus:ring-blue-500 placeholder:text-md"
        style={{
          boxShadow:
            "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
        }}
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
