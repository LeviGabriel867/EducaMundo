import { useState } from "react";
import ButtonActivities from "../../button/buttonActivities/ButtonActivities.jsx";
import Pictures from "./pictures/Pictures.jsx";
import Portuguese from "./portuguese/Portuguese.jsx";
import Literacy from "./literacy/Literacy.jsx";
import Surpraise from "./surpraise/Surpraise.jsx";
import Math from './mathematics/Math.jsx';
import PictureImg from "../../../assets/activitiesImage.png"; 
import MathImg from "../../../assets/activitiesMath.png";
import PortugueseImg from "../../../assets/activitiesPortuguese.png";
import LiteracyImg from "../../../assets/activitiesLiteracy.png";
import SurpraiseImg from "../../../assets/activitiesSurpraise.png";
import Header from "../../header/Header.jsx";
import { useSearch } from "../../../context/SearchContext.jsx";
import Footer from "../../footer/Footer.jsx";
import './Activities.css';

function Activities() {
    const [activeComponent, setActiveComponent] = useState(null); // Estado para armazenar o componente ativo
    const { searchQuery } = useSearch(); // Obtém o termo de busca do contexto

    const options = [
    {
        component: "literacy",
        img: LiteracyImg,
        h1: "Atividade de alfabetização",
        paragraph: "Aqui você encontra atividades de alfabetização de diferentes níveis e idades.",
        onClick: () => setActiveComponent("literacy")    
    },
    {
        component: "pictures",
        img: PictureImg,
        h1: "Atividade de pintura",
        paragraph: "Aqui você encontra atividades de pintura de diferentes níveis e idades.",
        onClick: () => setActiveComponent("pictures")
    },
    {
        component: "portuguese",
        img: PortugueseImg,
        h1: "Atividade de português",
        paragraph: "As melhores tarefas de língua portuguesa com diferentes níveis de dificuldade.",
        onClick: () => setActiveComponent("portuguese")
    },
    {
        component: "surpraise",
        img: SurpraiseImg,
        h1: "Atividade surpresa",
        paragraph: "Aqui você pode encontrar atividades especiais e relacionadas a datas comemorativas.",
        onClick: () => setActiveComponent("surpraise")
    },
    {
        component: "math",
        img: MathImg,
        h1: "Atividade de matemática básica",
        paragraph: "Aqui é onde a matemática ganha vida e é apresentada de uma forma mais que especial.",
        onClick: () => setActiveComponent("math")    
    },
    
    
    ];
     // Filtra as opções com base no termo de busca
     const filteredOptions = options.filter((option) =>
        option.h1.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Header/>
            <div className="father">
                        <div className="son">
                            <h1 className="paragraph">Atividades</h1>
                            {activeComponent === "literacy" ? (
                                <Literacy category="Atividade de alfabetização" />
                            ) : activeComponent === "pictures" ? (
                                <Pictures category="Atividade de pintura" />
                            ) : activeComponent === "portuguese" ? (
                                <Portuguese category="Atividade de português" />
                            ) : activeComponent === "surpraise" ? (
                                <Surpraise category="Atividade surpresa" />
                            ) : activeComponent === "math" ? (
                                <Math category="Atividade de matemática básica" />
                            ) : (
                                <div className="containerActivities">
                                    {filteredOptions.map((option, index) => (
                                        <div className="button-activities" key={index}>
                                            <ButtonActivities
                                                img={option.img}
                                                h1={option.h1}
                                                paragraph={option.paragraph}
                                                onClick={option.onClick}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="footer">
                            <p>As atividades contidas nessa sessão serão atualizadas semanalmente, sempre com conteúdos novos e preparados especialemente para o professor e aluno(a).</p>
                        </div>
                    </div>
                    <Footer/>
        </div>
        
    );
}

export default Activities;