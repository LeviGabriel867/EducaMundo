import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

import "./SuggestionsPage.css"

function SuggestionsPage() {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("")
    const [isVisible, setIsVisible] = useState(false); // Estado para controlar a visibilidade
    const [isLogin, setIsLogin] = useState(true);  
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


    const handleListSuggestions = async() =>{
        try {
            const response = await fetch("http://localhost:8080/downloadSuggestions");

            if(!response.ok){
                throw new Error("Erro in generating list")
            }
            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob)
            const a = document. createElement("a")
            a.href =  url;
            a.download = "Lista de sugestões dos usuários"
            document.body.appendChild(a);
            a.click()

            window.URL.removeObjectURL(url)
            document.body.removeChild(a)

        } catch (error) {
             console.log("Error in generating list", error)
        }
    }

    const handleDeleteSuggestion = async(id) => {
        try {
            const response =await fetch(`http://localhost:8080/deleteSuggestions/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type": "Application/json"
                }
            })
            if(response.ok){
                setMessage( isLogin? "Sugestão excluída com sucesso!":"")
                setIsVisible(true)

                setTimeout(() => {
                    setIsVisible(false); // Começa o fade-out
                }, 2500);
            
                setTimeout(() => {
                    setMessage(""); // Remove a mensagem completamente
                }, 3500);


                setSuggestions(prevSuggestions => prevSuggestions.filter(user => user._id !== id));

            }
        } catch (error) {
            console.log(error)
            setMessage("Error ao excluir sugestão")
        }
    }

    return (
        <div className="SuggestionsPage-container">
            <h2>Lista de Sugestões</h2>
            <button onClick={()=> handleListSuggestions()}>Baixar lista</button>
            {loading ? (
                <p>Carregando...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : suggestions.length > 0 ? (    
                    <ul>
                       {suggestions.map((user) => {
                            console.log(user);  // Verifique o objeto do usuário e seu _id
                            return (
                                <li className="itensList" key={user._id}>
                                    {user.suggestionsUsers}
                                    <MdDelete onClick={() => handleDeleteSuggestion(user._id)} />
                                </li>
                            );
                        })}
                    
                    </ul>
                    
             
                
            ) : (
                <p>Nenhuma sugestão disponível</p>
            )}
            <p className={`message ${isVisible ? "" : "hidden"}`}>{message}</p>
            <button className="SuggestionsButton" onClick={() => navigate("/")}>Voltar</button>
        </div>
    );
}

export default SuggestionsPage;
