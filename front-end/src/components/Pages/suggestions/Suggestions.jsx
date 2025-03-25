import { useState } from "react";
import Header from '../../header/Header.jsx'
import Footer from '../../footer/Footer.jsx'
import educaMundo from '../../../assets/educaMundo.png';
import './Suggestions.css';

function Suggestions() {
    const [suggestions, setSuggestions] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { suggestionsUsers: suggestions }; //suggestionsUsers está recebendo o valor da variavel suggestions

        try {
            const response = await fetch("http://localhost:8080/suggestions", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            setMessage(result.msg); // MSG vem da API

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
                    <img src={educaMundo} alt="" />
                </div>

                <h2>
                    Bem-vindo ao nosso espaço de colaboração! Aqui é onde sua ajuda é fundamental para aprimorarmos nosso trabalho.
                    Fique à vontade para nos questionar sobre qualquer dúvida que possa surgir e compartilhar suas valiosas sugestões.
                    Estamos aqui para ouvir você e aprimorar sua experiência.
                </h2>

                {/* Apply the .form class DIRECTLY to the <form> element */}
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