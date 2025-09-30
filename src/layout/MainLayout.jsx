import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import style from "./MainLayout.module.scss"
import NavBottom from "../components/navbottom/NavBottom";
import { useState } from "react";
const MainLayout = () => {
  const[showSidebar, setShowSidebar] = useState(false)
  return (
    <div className={`main_Layot ${showSidebar ? 'sidebar': ""}`}>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
      <NavBottom />
    <main className={`main ${showSidebar ? "sidebar" : ""}`}>
    <Outlet />
    </main>
    </div>
  );
};

export default MainLayout;
