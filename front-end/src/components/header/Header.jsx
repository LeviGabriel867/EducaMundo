import React, { useState } from "react";
import educaMundoLogo from "../../assets/testeLogo2.png";
import { IoSearch } from "react-icons/io5";
import { VscMenu } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import './Header.css';

function Header() {
    const { searchQuery, setSearchQuery } = useSearch();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSearch = (e) => {
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
        console.log("Buscando por:", searchQuery.trim());
        setSearchQuery(searchQuery.trim());
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <div className="services-system__header">
            <Link to="/">
                <img src={educaMundoLogo} alt="Logo EducaMundo" className="services-system__logo" />
            </Link>

            <button 
                className="menu-toggle" 
                onClick={() => setMenuOpen(!menuOpen)} 
                aria-label="Abrir menu"
            >
                <VscMenu size={24} color="white" />
            </button>

            <div className={`services-system__search-bar ${menuOpen ? 'visible' : ''}`}>
                <input 
                    type="text"
                    id="headerInput"
                    placeholder="Digite aqui o que você procura"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <label
                    htmlFor="headerInput"
                    onClick={handleSearch}
                    role="button"
                    className="header-button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSearch(e); }}
                >
                    <IoSearch className="search-icon" />
                    Buscar
                </label>
            </div>

            <ul className={`services-system__nav ${menuOpen ? 'visible' : ''}`}>
                <li><Link to="/">Página Inicial</Link></li>
                <li><Link to="/sobre">Sobre</Link></li>
                <li><Link to="/contato">Contato</Link></li>
            </ul>
        </div>
    );
}

export default Header;
