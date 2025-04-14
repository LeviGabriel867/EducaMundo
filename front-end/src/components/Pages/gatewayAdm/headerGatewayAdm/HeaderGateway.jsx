import { FaBars } from "react-icons/fa";
import "./HeaderGateway.css";

function HeaderGateway({ showSideBar }) {
  return (
    <header className="header-gateway">
      <div className="header-content">
        <FaBars className="menu-icon" onClick={showSideBar} />
        <h1 className="title">Painel do Administrador</h1>
      </div>
    </header>
  );
}

export default HeaderGateway;
