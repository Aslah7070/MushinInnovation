import { Search } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search experts, fields, or topics..."
          className="w-full py-1 pl-12 pr-4 text-black border shadow-2xl    border-black rounded-2xl  focus:outline-none focus:ring-2 focus:ring- focus:border-transparent"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black" size={20} />
      </div>
    </div>
  )
}
