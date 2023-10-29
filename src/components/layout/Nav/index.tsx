import NavMd from "./Md"
import MobileNav from "./Mobile"
import { Dictionary } from '@/utils/get_dictionaries';

export default function Nav({ t }: { t: Dictionary}){
  return (
    <nav className="bg-blue-800">
      <NavMd t={t} />
      <MobileNav />
    </nav>
  )
}