import { useNavigate } from "react-router-dom";
import "./SuggestionsUsers.css";

function SuggestionsUsers() {
    const navigate = useNavigate();

    return (
        <div className="suggestions-container">
            <h2>Ver sugestões personalizadas</h2>
            <p>Explore sugestões feitas com carinho para cada criança com base nas interações recentes.</p>
            <button className="button-suggestions" onClick={() => navigate("/suggestionsPage")}>
                Visualizar sugestões
            </button>
        </div>
    );
}

export default SuggestionsUsers;
