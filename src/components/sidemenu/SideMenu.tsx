import { NavLink } from "react-router-dom";
import "./styles/sidemenu.css"

interface SideMenuProps {
  onClose?: () => void;
}

function SideMenu({ onClose }: SideMenuProps) {
    console.log("SideMenu rendered");
  return (
    <aside className="side-menu">
      <ul>
        <li><NavLink to="/" onClick={onClose}>홈</NavLink></li>
        <li><NavLink to="/os" onClick={onClose}>운영 체제</NavLink></li>
        <li><NavLink to="/network" onClick={onClose}>네트워크</NavLink></li>
        <li><NavLink to="/ca" onClick={onClose}>컴퓨터 구조</NavLink></li>
        <li><NavLink to="/db" onClick={onClose}>데이터베이스</NavLink></li>
        <li><NavLink to="/ds" onClick={onClose}>자료 구조</NavLink></li>
        <li><NavLink to="/algo" onClick={onClose}>알고리즘</NavLink></li>
      </ul>
    </aside>
  );
}

export default SideMenu;
