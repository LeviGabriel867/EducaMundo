import { Link } from "react-router-dom";
import component from "../../../assets/component.png";
import "./ServicesSystem.css";
import ButtonOptions from "../../button/ButtonOptions";
import './ServicesSystem.css'
function ServicesSystem() {
    return (
        <div className="ServicesSystem">
            <h1 >Escolha uma das seguintes opções: </h1>
            <p >
                Nessa seção você irá encontrar sugestões de atividades para realizar com seus aluno
                ou aluna que necessita de atividades inclusivas.
            </p>
            <div className="OptionsContainer">
                <Link to={"/Activities"}>
                    <ButtonOptions 
                        img={component} 
                        h1="Atividades" 
                        paragraph="Escolha uma das nossas atividades especiais clicando nesta seção."
                    />
                </Link>

                <Link to={"/InteractiveVideos"}>
                    <ButtonOptions 
                        img={component} 
                        h1="Vídeos Interativos" 
                        paragraph="Escolha diversos vídeos que podem ser usados para aprendizado com entretenimento"
                    />
                </Link>

                <Link to={"/Suggestions"}>
                    <ButtonOptions 
                        img={component} 
                        h1="Sugestões e Opiniôes" 
                        paragraph="Esta sessão, você pode deixar sua sugestão ou crítica construtiva para melhoramos nosso app. Fique a vontade!"
                    />
                </Link>
            </div>
        </div>
    );
}

export default ServicesSystem;
