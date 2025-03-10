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

    function downloadImg({ idImg, nameFile }) {
        const fetchImg = async () => {
            try {
                const response = await fetch(`http://localhost:8080/download/${idImg}`);
    
                if (!response.ok) {
                    throw new Error("Erro ao baixar PDF");
                }
    
                // Converte a resposta em um blob (arquivo)
                const blob = await response.blob();
    
                // Cria um link temporário para download
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${nameFile}`; // Nome do arquivo baixado
                document.body.appendChild(a);
                a.click();
    
                // Remove o link temporário
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
    
            } catch (error) {
                console.log("Erro ao baixar PDF:", error);
            }
        };
        fetchImg();
    }
    
   

    return(
        <div className="containerActivities">
            <h1>Olá, bem-vindo(a) a nossa {category}</h1>
            <ul>
                {activities.map((activity) => (
                    <li key={activity._id}>
                        <h2>{activity.name}</h2>
                        <h3>{activity.description}</h3>
                        <img src={`http://localhost:8080/${activity.path}`} alt={activity.name} />
                        <button onClick={() => downloadImg({idImg: activity._id, nameFile:activity.name})}>Baixar como PDF</button>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default UploadActivities;