import { useState } from "react";
import component from "../../../assets/component.png";
import Suggestions from '../suggestions/Suggestions.jsx' ; // Certifique-se de que o caminho está correto
import ButtonActivities from '../../button/butttonActivities/ButtonActivities.jsx'
import ButtonOptions from '../../button/ButtonOptions.jsx'

function Activities() {
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleClick = () => {
        setShowSuggestions(true);
    };

    return (
        <div>
            {showSuggestions ? (
                <Suggestions />
            ) : (
                
                <ButtonOptions
                    img={component}
                    h1="Atividade de pintura"
                    paragraph="Aqui você encontra atividades de pintura de diferentes níveis e idades."
                    onClick={() => setShowSuggestions(true)} 
                />
            )}
                

            {/*<ButtonActivities
                stateFunction={showSuggestions}  // Controla qual componente será mostrado
                component={<Suggestions />}     // Passa o componente Suggestions como prop
                img={component}
                h1={"Atividade de pintura"}
                paragraph={"Aqui você encontra atividades de pintura de diferentes níveis e idades."}
                onClick={() => setShowSuggestions(true)} // Altera o estado para true ao clicar
            />
*/}
        </div>
    );
}

export default Activities;
