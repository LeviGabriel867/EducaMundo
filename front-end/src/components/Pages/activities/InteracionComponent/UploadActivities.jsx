import { useState, useEffect } from "react";
import { FaFileDownload } from "react-icons/fa";
const API_URL = import.meta.env.VITE_API_URL;
import './UploadActivities.css';

function UploadActivities({ category }) {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 


    useEffect(() => {
        const fetchActivities = async () => {
            setLoading(true); 
            setError(null);  
            try {
                const response = await fetch(
                    `${API_URL}/activities?category=${category}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`); 
                }
                const data = await response.json();
                setActivities(data);
            } catch (error) {
                console.error("Erro ao buscar atividades:", error);
                setError(error.message); 
            } finally {
                setLoading(false); 
            }
        };
        fetchActivities();
    }, [category]);

    function downloadImg({ idImg, nameFile }) {
        const fetchImg = async () => {
            try {
                const response = await fetch(`${API_URL}/activities/download/${idImg}`);

                if (!response.ok) {
                    throw new Error("Erro ao baixar PDF");
                }

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${nameFile}`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);

            } catch (error) {
                console.error("Erro uploaded PDF:", error);
            }
        };
        fetchImg();
    }



    return (
        <div className="containerUploaded">
            <h1>{category}</h1>

            {loading ? (  
                <p className="loading-message">Carregando atividades...</p>
            ) : error ? ( 
                <p className="error-message">Erro ao carregar atividades: {error}</p>
            ) : activities.length === 0 ? ( 
                <p className="empty-message">Nenhuma atividade encontrada para esta categoria.</p>
            ) : (
                <ul>
                    {activities.map((activity) => (
                        <li key={activity._id}>
                            <h2>{activity.name}</h2>
                            <h3>{activity.description}</h3>
                            <div className="image-wrapper">
                                <img src={`${API_URL}/${activity.path}`} alt={activity.name} />
                            </div>
                            <button className="download-button" onClick={() => downloadImg({ idImg: activity._id, nameFile: activity.name })}>
                                <span className="button-icon">{<FaFileDownload />}</span> Baixar como PDF
                            </button>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UploadActivities;