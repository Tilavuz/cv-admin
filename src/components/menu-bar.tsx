import { menuContext } from "@/contexts/menu-context"
import { useLoad } from "@/hooks/use-load"
import { FilePlus, FolderKanban } from "lucide-react"
import { useContext } from "react"
import { NavLink } from "react-router-dom"

export default function MenuBar() {

    const { menu } = useContext(menuContext)
    const { loading, handleLoading } = useLoad()
  return (
    <aside className={`${menu ? "w-[380px] min-h-screen increase-width border-r" : "w-[65px] min-h-screen increase-width-opposite border-r"}`}>
        <div className="h-[65px] flex justify-center items-center text-2xl font-thin border-b mb-6">
            <h1 className={`${menu ? "" : "hidden"}`}>Tilovov Shavqiddin</h1>
            <h1 className={`${!menu ? "" : "hidden"}`}>TSH</h1>
        </div>
        <div className={`${menu ? "flex flex-col items-center border-b pb-8" : "hidden"}`}>
            <div className="rounded-full size-24 border flex justify-center items-center mb-2">
                <img onLoad={() => handleLoading()} className={`${loading ? "rounded-full size-24" : "hidden"}`} src="https://firebasestorage.googleapis.com/v0/b/total-array-422417-i0.appspot.com/o/image-1.jpg?alt=media&token=01dee4e3-bcd7-4df4-94be-593b87ed9aca" alt="image" />
                <p className={`${loading ? "hidden" : "text-2xl font-bold"}`}>TSH</p>
            </div>
            <div className="">
                <h2 className="font-thin text-xl">Frontend developer</h2>
            </div>
        </div>
        <ul className="py-4">
            <li className="h-12 border-b">
                <NavLink className={`${menu ? "gap-2 pl-8" : "justify-center"} bar-link flex items-center h-full hover:bg-[#f5f5f5]`} to={'/'}>
                    <FolderKanban size={24}/>
                    <span className={`${menu ? "" : "hidden"}`}>Projects</span>
                </NavLink>
            </li>
            <li className="h-12 border-b">
                <NavLink className={`${menu ? "gap-2 pl-8" : "justify-center"} bar-link flex items-center h-full hover:bg-[#f5f5f5]`} to={'/posting'}>
                    <FilePlus size={24}/>
                    <span className={`${menu ? "" : "hidden"}`}>Posting</span>
                </NavLink>
            </li>
        </ul>
    </aside>
  )
}
