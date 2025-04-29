import "./SuggestionsUsers.css";

function SuggestionsUsers({ setViewSuggestionsPageVisible }) {
    return (
        <div className="suggestions-container">
            <h2>Ver sugestões personalizadas</h2>
            <p>Explore sugestões feitas com carinho para cada criança com base nas interações recentes.</p>
            <button className="button-suggestions" onClick={() => setViewSuggestionsPageVisible(true)}>
                Visualizar sugestões
            </button>
        </div>
    );
}


export default SuggestionsUsers;
