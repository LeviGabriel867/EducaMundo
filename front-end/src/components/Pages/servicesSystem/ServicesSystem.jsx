import React from "react";
import { Link } from "react-router-dom";
import "./ServicesSystem.css";
import Footer from "../../footer/Footer";
import CriancasABC from "../../../assets/criançasABC.png";
import component from "../../../assets/component.png";
import ButtonOptions from "../../button/ButtonOptions";
import Header from "../../header/Header";
import abcActivities from "../../../assets/abcActivities.png";
import kid from "../../../assets/kid.png";
import play from "../../../assets/play.png";
import lampada from "../../../assets/lampada.png";



import { useSearch } from "../../../context/SearchContext"; // Importa o contexto

function ServicesSystem() {
    const { searchQuery } = useSearch(); // Obtém o termo de busca do contexto

    // Dados simulados que serao usados na pesquisa e também para exibir as opções de atividades
    const options = [
        {
            path: "/Activities",
            img: abcActivities,
            h1: "Atividades",
            paragraph: "Descubra atividades divertidas e educativas para crianças autistas.",
        },
        {
            path: "/InteractiveVideos",
            img: kid,
            h1: "Vídeos Educativos",
            paragraph: "Explore vídeos interativos e educativos para um aprendizado divertido.",
        },
        {
            path: "/games",
            img: play,
            h1: "Jogos Educativos",
            paragraph: "Desperte a lógica das crianças com jogos interativos!.",
        },
        {
            path: "/Suggestions",
            img: lampada,
            h1: "Sua opinião importa",
            paragraph: "Compartilhe suas ideias e sugestões. Sua opinião é essencial.",
        }
    ];

    // Filtra as opções com base no termo de busca
    const filteredOptions = options.filter((option) =>
        option.h1.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="services-system">
            <Header />
            <div className="services-system__main-content">
                <img
                    src={CriancasABC}
                    alt="Crianças brincando com letras"
                    className="services-system__main-image"
                />
                <section className="services-system__text-section">
                    <h2>
                        EducaMundo: Atividades e vídeos educativos para crianças autistas.
                        Simples de usar, para casa e escola.
                    </h2>
                </section>
            </div>
            <div className="services-system-origin">
                <h1 className="services-system__title">O que você busca hoje?</h1>
                <p className="services-system__description">
                    Descubra atividades e vídeos educativos para crianças autistas.
                </p>
            </div>

            <div className="services-system__options-container">
                {filteredOptions.map((option, index) => (
                    <div className="button-options" key={index}>
                        <Link to={option.path} state={{ currentPath: option.path }}>
                            <ButtonOptions
                                img={option.img}
                                h1={option.h1}
                                paragraph={option.paragraph}
                            />
                        </Link>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
}

export default ServicesSystem;