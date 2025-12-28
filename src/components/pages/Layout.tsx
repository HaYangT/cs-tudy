import type { JSX } from "react";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideMenu from "../sidemenu/SideMenu";
import "./styles/Layout.css"

function Layout(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    <div className="top-bar">
      <div className="button-container">
        <button
          className="post-it-button"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          ☰ 메뉴
        </button>
      </div>
    </div>
      {menuOpen && <SideMenu onClose={() => setMenuOpen(false)} />}

      <main className="notebook">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
