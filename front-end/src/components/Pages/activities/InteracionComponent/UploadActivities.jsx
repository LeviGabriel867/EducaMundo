import { useState, useEffect } from "react";
import './UploadActivities.css'; // Importe o CSS



function UploadActivities({category}){
    const [activities, setActivities] = useState([])

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/activities?category=${category}`
                );

                const data = await response.json()
                setActivities(data)
            } catch (error) {
                console.log("Erro ao buscar atividades")
            }
        };
        fetchActivities()
    }, [category]);

    return(
        <div className="containerActivities">
            <h1>Olá, bem-vindo(a) a nossa {category}</h1>
            <ul>
                {activities.map((activity) => (
                    <li key={activity._id}>
                        <h2>{activity.name}</h2>
                        <h3>{activity.description}</h3>
                        <img src={`http://localhost:8080/${activity.path}`} alt={activity.name} />
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default UploadActivities;