import { menuContext } from "@/contexts/menu-context";
import { Menu } from "lucide-react";
import { useContext } from "react";

export default function Header() {

    const { menu, handleMenu } = useContext(menuContext)

    return (
        <header className="h-[65px] border-b fixed w-full backdrop-blur">
            <div className="h-full flex items-center px-4">
                <div>
                    <button onClick={() => handleMenu()}>
                        <Menu size={24}/>
                    </button>
                </div>
            </div>
        </header>
    )
}
