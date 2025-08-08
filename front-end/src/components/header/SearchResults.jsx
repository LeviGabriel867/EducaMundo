import React from "react";
import { useLocation } from "react-router-dom";

function SearchResults() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("q"); 

  
    const dataByScreen = {
        "/Activities": [
            { id: 1, name: "Atividade de pintura", description: "Atividades de pintura para diferentes níveis." },
            { id: 2, name: "Atividade de matemática básica", description: "Matemática de forma divertida." },
            { id: 3, name: "Atividade de português", description: "Tarefas de língua portuguesa." },
            { id: 4, name: "Atividade de alfabetização", description: "Apresentação da alfabetização." },
        ],
        "/Services": [
            { id: 1, name: "Atividades", description: "Atividades lúdicas e educativas." },
            { id: 2, name: "Vídeos Interativos", description: "Vídeos educativos e interativos." },
            { id: 3, name: "Jogos Educativos", description: "Jogos para desenvolver competências." },
            { id: 4, name: "Sua opinião importa", description: "Compartilhe suas ideias e sugestões." },
        ],
    };

    const currentPath = location.state?.currentPath || "/Activities";
    const data = dataByScreen[currentPath] || [];

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery?.toLowerCase() || "")
    );

    return (
        <div>
            <h1>Resultados da busca por: "{searchQuery}"</h1>
            {filteredData.length > 0 ? (
                <ul>
                    {filteredData.map((item) => (
                        <li key={item.id}>
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum resultado encontrado.</p>
            )}
        </div>
    );
}

export default SearchResults;