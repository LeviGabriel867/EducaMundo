import { Link } from "react-router-dom";
import "./ServicesSystem.css";
import Footer from "../../footer/Footer";
import CriancasABC from "../../../assets/criançasABC.png";
import component from "../../../assets/component.png" // Imagem do componente
import ButtonOptions from "../../button/ButtonOptions";
import Header from "../../header/Header";

function ServicesSystem() {
    return (
        <div className="services-system">
            <Header/>
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
                        <Link to={"/Activities"}>
                        <ButtonOptions
                            img={component}
                            h1={"Atividades"}
                            paragraph={"Descubra atividades lúdicas e educativas para crianças autistas."}
                        />
                        </Link>
                        
                    </div>
                
                    <div  className="button-options">

                        <Link to={"/InteractiveVideos"}>
                            <ButtonOptions
                            img={component}
                            h1={"Vídeos Interativos"}
                            paragraph={"Aprenda com vídeos interativos e educativos. Diversão garantida."}
                       
                            />
                        </Link>
                    </div>
              
                    <div className="button-options">
                        <Link to={'/games'}>
                            <ButtonOptions
                            img={component}
                            h1={"Jogos Educativos"}
                            paragraph={"Desenvolva competências com jogos educativos."}
                            />
                        </Link>
                    </div>
                    
                    <div  className="button-options">
                        <Link to={"/Suggestions"}>
                            <ButtonOptions
                            img={component}
                            h1={"Sua opinião importa"}
                            paragraph={"Compartilhe suas ideias e sugestões. Sua opinião é essencial."}
                            />
                        </Link>
                    </div>
                
            </div>

            <Footer/>
        </div>
    );
}

export default ServicesSystem;