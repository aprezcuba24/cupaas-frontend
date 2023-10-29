import NavMd from "./Md"
import MobileNav from "./Mobile"

export default function Nav(){
  return (
    <nav className="bg-blue-800">
      <NavMd/>
      <MobileNav />
    </nav>
  )
}