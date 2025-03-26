import React from "react";
import educaMundoLogo from "../../assets/educaMundo.png";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSearch } from "../../context/SearchContext"; // Importa o contexto
import './Header.css';

function Header() {
    const { searchQuery, setSearchQuery } = useSearch(); // Usa o contexto

    const handleSearch = (e) => {
        e.preventDefault();
        // O termo de busca será atualizado no contexto
        setSearchQuery(searchQuery.trim());
    };

    return (
        <div className="services-system__header">
            <Link to="/">
                <img src={educaMundoLogo} alt="Logo EducaMundo" className="services-system__logo" />
            </Link>
            <form className="services-system__search-bar" onSubmit={handleSearch}>
                <input
                    type="text"
                    id="searchInput"
                    placeholder="Digite aqui o que você procura"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Atualiza o estado no contexto
                />
                <button type="submit" className="search-button">
                    <IoSearch className="search-icon" />
                    Buscar
                </button>
            </form>
            <ul className="services-system__nav">
                <li><Link to="/">Página Inicial</Link></li>
                <li><Link to="/sobre">Sobre</Link></li>
                <li><Link to="/contato">Contato</Link></li>
            </ul>
        </div>
    );
}

export default Header;