import React from "react";
import educaMundoLogo from "../../assets/educaMundo.png";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSearch } from "../../context/SearchContext"; // Importa o contexto
import './Header.css';

function Header() {
    const { searchQuery, setSearchQuery } = useSearch(); // Usa o contexto

    // Esta função agora pode ser chamada tanto pelo onSubmit do form
    // quanto pelo onClick do label.
    const handleSearch = (e) => {
        // Previne o comportamento padrão (recarregar a página no submit do form)
        // ou qualquer comportamento padrão do clique no label, se houver.
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
        // Atualiza o termo de busca no contexto
        console.log("Buscando por:", searchQuery.trim()); // Adicione um log para depuração
        setSearchQuery(searchQuery.trim());
        // Aqui você pode adicionar lógica para redirecionar para uma página de resultados, se necessário
        // Ex: navigate(`/search?q=${searchQuery.trim()}`); (precisaria importar useNavigate)
    };

    // Função para lidar com Enter no input (opcional, pois o form já faz isso)
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e); // Chama a mesma lógica de busca
        }
    };

    return (
        <div className="services-system__header">
                <Link to="/">
                    <img src={educaMundoLogo} alt="Logo EducaMundo" className="services-system__logo" />
                </Link>
                <div className="services-system__search-bar" onSubmit={handleSearch}>
                    <input 
                    type="text"
                    id="headerInput"
                    placeholder="Digite aqui o que você procura"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Atualiza o estado no contexto
                    onKeyDown={handleKeyDown} // Opcional: Garante Enter se o form falhar
                    />
                    <label htmlFor="headerInput"
                    onClick={handleSearch}     
                    role="button"       
                    className="header-button"     
                    tabIndex={0}            
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSearch(e); }} // Permite acionar com Enter/Espaço quando focado
                >
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
    );
}

export default Header;