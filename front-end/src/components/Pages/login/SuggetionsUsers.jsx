import { useEffect, useState } from "react";
import './Login.css';

function SuggestionsUsers({ onViewSuggestionsClick }) {
    const [viewSuggestions, setViewSuggestions] = useState(false); // Começa fechado
    const [suggestionsUsers, setSuggestionsUsers] = useState([]); // Estado inicial como array

    useEffect(() => {
        const fetchSuggestions = async () => {
            const endpoint = "http://localhost:8080/suggestions";

            try {
                const response = await fetch(endpoint);

                if (!response.ok) {
                    throw new Error("Erro na resposta da API");
                }

                const data = await response.json();
                setSuggestionsUsers(data);
            } catch (error) {
                console.error("Erro ao buscar sugestões:", error);
            }
        };

        fetchSuggestions();
    }, []); // O useEffect executa apenas uma vez no carregamento

    return (
        <div>
            {viewSuggestions ? (
                <>
                    <button id="button-suggestions" onClick={() => setViewSuggestions(false)}>Ocultar sugestões</button>
                    <ul>
                        {suggestionsUsers.map((user, index) => (
                            <li key={index}>{user.suggestionsUsers}</li>
                        ))}
                    </ul>
                </>
            ) : (
                <button 
                    id="button-suggestions" 
                    onClick={() => {
                        setViewSuggestions(true); // Mostra as sugestões
                        onViewSuggestionsClick(); // Altera o estado no componente pai para exibir ViewSuggestions
                    }}
                >
                    Visualizar sugestões
                </button>
            )}
        </div>
    );
}

export default SuggestionsUsers;