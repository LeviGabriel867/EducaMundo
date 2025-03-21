import educaMundoLogo from "../../assets/educaMundo.png";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import './Header.css'
function Header(){
    return(
        <div className="services-system__header">
                <Link to="/">
                    <img src={educaMundoLogo} alt="Logo EducaMundo" className="services-system__logo" />
                </Link>
                <div className="services-system__search-bar">
                    <input type="text" id="searchInput" placeholder="Digite aqui o que você procura" />
                    <label htmlFor="searchInput">
                        <IoSearch className="search-icon" />
                        Buscar
                    </label>
                </div>
                <ul className="services-system__nav">
                    <li><Link to="/">Página Inicial</Link></li>
                    <li><Link to="/sobre">Sobre</Link></li> {/* Adicione rotas corretas */}
                    <li><Link to="/contato">Contato</Link></li> {/* Adicione rotas corretas */}
                </ul>
            </div>
    )
}

export default Header