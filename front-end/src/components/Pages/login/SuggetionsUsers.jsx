import { useNavigate } from "react-router-dom";

function SuggestionsUsers() {
    const navigate = useNavigate();

    return (
        <div>
            <button id="button-suggestions" onClick={() => navigate("/suggestionsPage")}>
                Visualizar sugestões
            </button>
        </div>
    );
}

export default SuggestionsUsers;
