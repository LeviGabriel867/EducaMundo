import { useState, useEffect } from "react";

function Pictures({ category }) { // Recebe a categoria como prop
    const [activities, setActivities] = useState([]); // Estado para armazenar as atividades

    useEffect(() => {
        // Função para buscar as atividades
        const fetchActivities = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/activities?category=${category}`
                );
                const data = await response.json();
                setActivities(data); // Atualiza o estado com as atividades encontradas
            } catch (error) {
                console.error("Erro ao buscar atividades:", error);
            }
        };

        fetchActivities(); // Chama a função ao carregar o componente
    }, [category]); // Executa novamente se a categoria mudar

    return (
        <div className="containerActivities">
            <h1>Olá, bem vindo(a) a nossa {category}</h1>
            <ul>
                {activities.map((activity) => (
                    <li key={activity._id}>
                        <h2>{activity.name}</h2>
                        {/*<p>Categoria: {activity.category}</p>*/}
                        <img src={`http://localhost:8080/${activity.path}`} alt={activity.name} />

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Pictures;