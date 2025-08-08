import { useState } from "react";
import Header from '../../header/Header.jsx'
import Footer from '../../footer/Footer.jsx'
import educaMundo from '../../../assets/educaMundo.png';
import './Suggestions.css';

const API_URL =import.meta.env.VITE_API_URL;

function Suggestions() {
    const [suggestions, setSuggestions] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { suggestionsUsers: suggestions }; 

        try {
            const response = await fetch(`${API_URL}/suggestions`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            setMessage(result.msg); 

            if (response.ok) {
                setMessage("Sugestão enviada com sucesso.");
                setSuggestions("");
            }
        } catch (error) {
            console.error(error);
            setMessage("Erro no envio da sugestão.");
        }
    };

    return (
        <>
            <Header />
            <div className="container-suggestions">

                <div className="container-header">
                    <h1>Suporte de contato</h1>
                </div>

                <h2>
                    Bem-vindo ao nosso espaço de colaboração! Aqui é onde sua ajuda é fundamental para aprimorarmos nosso trabalho.
                    Fique à vontade para nos questionar sobre qualquer dúvida que possa surgir e compartilhar suas valiosas sugestões.
                    Estamos aqui para ouvir você e aprimorar sua experiência.
                </h2>

                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="suggestion">Deixe sua dúvida ou sugestão logo abaixo:</label>
                    <input
                        id="suggestion"
                        type="text"
                        placeholder="Digite aqui"
                        value={suggestions}
                        onChange={(e) => setSuggestions(e.target.value)}
                    />
                    <button type="submit">Enviar</button>
                </form>
                {message && <p>{message}</p>}

            </div>

            <Footer />
        </>
    );
}

export default Suggestions;