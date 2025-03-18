import { Link } from "react-router-dom";
import "./ServicesSystem.css";
import { IoSearch } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import educaMundoLogo from "../../../assets/educaMundo.png";
import CriancasABC from "../../../assets/criançasABC.png";
import component from "../../../assets/component.png" // Imagem do componente


function ServicesSystem() {
    return (
        <div className="services-system">
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

            <div className="services-system__main-content">
                <img src={CriancasABC} alt="Crianças brincando com letras" className="services-system__main-image" />
                <section className="services-system__text-section">
                <h2>EducaMundo: Atividades e vídeos  educativos para crianças autistas. Simples de usar, para casa e escola.</h2>
                
            </section>
            </div>
            <div className="services-system-origin">
                <h1 className="services-system__title">O que você busca hoje?</h1>
                <p className="services-system__description">
                    Descubra atividades e vídeos educativos para crianças autistas.
                </p>
            </div>

            <div className="services-system__options-container">
               
                    <div className="button-options">
                        <img src={component} alt="Ícone Atividades" />
                        <h3>Atividades</h3>
                        <p>Descubra atividades lúdicas e educativas para crianças autistas.</p>
                    </div>
                

               
                    <div  className="button-options">
                        <img src={component} alt="Ícone Vídeos Interativos" />
                        <h3>Vídeos interativos</h3>
                        <p>Aprenda com vídeos interativos e educativos. Diversão garantida.</p>
                    </div>
              
                    <div className="button-options">
                        <img src={component} alt="Ícone jogos" />
                        <h3>Jogos educativos</h3>
                        <p>Desenvolva competências com jogos educativos</p>
                    </div>
                
                    <div  className="button-options">
                        <img src={component} alt="Ícone Sugestões" />
                        <h3>Sua opinião importa</h3>
                        <p>Compartilhe suas ideias e sugestões. Sua opinião é essencial.</p>
                    </div>
                
            </div>

            <footer className="services-system__footer">
                <FaInstagram className="footer-icon" />
                <FaWhatsapp className="footer-icon" />
                <p>EducaMundo ©2025. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default ServicesSystem;