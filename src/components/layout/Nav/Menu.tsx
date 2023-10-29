export default function Menu() {
  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        <a href="#" className="bg-blue-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a>
        <a href="#" className="text-gray-300 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Team</a>
        <a href="#" className="text-gray-300 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Projects</a>
        <a href="#" className="text-gray-300 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</a>
        <a href="#" className="text-gray-300 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Reports</a>
      </div>
    </div>
  )
}