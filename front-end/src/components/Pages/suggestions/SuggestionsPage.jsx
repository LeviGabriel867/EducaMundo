import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SuggestionsPage.css"

function SuggestionsPage() {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuggestions = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:8080/suggestions");

                if (!response.ok) throw new Error("Erro ao buscar sugestões");

                const data = await response.json();
                const filteredData = data.filter(user => user.suggestionsUsers);

                setSuggestions(filteredData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, []);

    return (
        <div className="SuggestionsPage-container">
            <h2>Lista de Sugestões</h2>
            {loading ? (
                <p>Carregando...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : suggestions.length > 0 ? (
                <ul>
                    {suggestions.map((user) => (
                        <li className="itensList" key={user._id}>{user.suggestionsUsers}</li>
                    ))}
                </ul>
            ) : (
                <p>Nenhuma sugestão disponível</p>
            )}

            <button className="SuggestionsButton" onClick={() => navigate("/")}>Voltar</button>
        </div>
    );
}

export default SuggestionsPage;
