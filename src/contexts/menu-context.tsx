import { ReactNode, createContext, useState } from "react"


interface MenuContextType {
    menu: boolean;
    handleMenu: () => void;
}

interface MenuProviderProps {
  children: ReactNode; 
}
const defaultValue: MenuContextType = {
  menu: false,
  handleMenu: () => {}, 
};
  
export const menuContext = createContext<MenuContextType>(defaultValue)


export default function MenuContext({ children }: MenuProviderProps) {

    const [menu, setMenu] = useState<boolean>(true)

    const handleMenu: () => void = () => {
        setMenu(!menu)
    }

  return (
    <menuContext.Provider value={{ menu, handleMenu }}>
      {
        children
      }
    </menuContext.Provider>

  )
}



