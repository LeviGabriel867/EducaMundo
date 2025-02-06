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
import './Activities.css';

function Activities() {
    const [activeComponent, setActiveComponent] = useState(null); // Estado para armazenar o componente ativo

    return (
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
                    <div className="container-activities">
                        <ButtonActivities 
                            shouldShowComponent={false} 
                            img={PictureImg} 
                            h1="Atividade de pintura"
                            paragraph="Aqui você encontra atividades de pintura de diferentes níveis e idades."
                            onClick={() => setActiveComponent("pictures")} 
                        />
                        
                        <ButtonActivities
                            shouldShowComponent={false} 
                            img={MathImg}
                            h1="Atividade de matemática básica"
                            paragraph="Aqui é onde a matemática ganha vida e é apresentada de uma forma mais que especial."
                            onClick={() => setActiveComponent("math")} 
                        />

                        <ButtonActivities
                            shouldShowComponent={false}
                            img={PortugueseImg}
                            h1={"Atividade de português"}
                            paragraph={"As melhores tarefas de língua portuguesa com diferentes níveis de dificuldade. "}
                            onClick={() => setActiveComponent("portuguese")}
                        />

                        <ButtonActivities
                            shouldShowComponent={false}
                            img={LiteracyImg}
                            h1={"Atividade de alfabetização"}
                            paragraph={"Uma forma incrível de apresentar a alfabetização você encontra aqui. "}
                            onClick={() => setActiveComponent("literacy")}
                        />
                        
                        <ButtonActivities
                            shouldShowComponent={false}
                            img={SurpraiseImg}
                            h1={"Atividade surpresa"}
                            paragraph={"Aqui você pode encontrar atividades especiais e relacionadas a datas comemorativas. "}
                            onClick={() => setActiveComponent("surpraise")}
                        />
                    </div>
                )}
            </div>
            <div className="footer">
                <p>As atividades contidas nessa sessão serão atualizadas semanalmente, sempre com conteúdos novos e preparados especialemente para o professor e aluno(a).</p>
            </div>
        </div>
    );
}

export default Activities;