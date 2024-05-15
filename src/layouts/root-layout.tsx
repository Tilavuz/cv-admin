import Header from "@/components/header";
import MenuBar from "@/components/menu-bar";
import MenuContext from "@/contexts/menu-context";
import ToastContext from "@/contexts/toast-context";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <MenuContext>
      <div className="flex">
        <MenuBar />
        <div className="flex-1">
            <Header />
            <ToastContext>
              <div className="z-10 w-full h-screen pt-24 px-6 overflow-y-scroll">
                  <Outlet />
              </div>
            </ToastContext>
        </div>
      </div>
    </MenuContext>
  );
}
