import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import ButtonActivities from "../../button/buttonActivities/ButtonActivities.jsx";
import Header from "../../header/Header.jsx";
import Footer from "../../footer/Footer.jsx";
import PictureImg from "../../../assets/activitiesImage.png";
import MathImg from "../../../assets/activitiesMath.png";
import PortugueseImg from "../../../assets/activitiesPortuguese.png";
import { useSearch } from "../../../context/SearchContext.jsx";
import "./InteractiveVideos.css";

function InteractiveVideos() {
    const [activeCategory, setActiveCategory] = useState(null);
    // ✨ Estado único para armazenar os dados dos vídeos (incluindo títulos vindos do backend)
    const [videoData, setVideoData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { searchQuery } = useSearch();

    useEffect(() => {
        // Função para buscar vídeos já com os títulos do backend
        const fetchVideosWithTitles = async () => {
            if (!activeCategory) {
                setVideoData([]); // Limpa os dados se nenhuma categoria estiver ativa
                return;
            }

            setLoading(true);
            setError(null); // Limpa erros anteriores

            try {
                // ✨ Chama a nova rota do backend que retorna vídeos com títulos
                const response = await fetch(`http://localhost:8080/videosWithTitles?category=${encodeURIComponent(activeCategory)}`);

                if (!response.ok) {
                    // Tenta ler a mensagem de erro do backend se disponível
                    let errorMsg = `Erro ao buscar vídeos: ${response.status} ${response.statusText}`;
                    try {
                        const errorData = await response.json();
                        errorMsg = errorData.msg || errorMsg; // Usa a msg do backend se existir
                    } catch (jsonError) {
                        // Ignora se não conseguir parsear o JSON do erro
                    }
                    throw new Error(errorMsg);
                }

                const data = await response.json();
                console.log("Dados recebidos (vídeos com títulos):", data);
                setVideoData(data); // Armazena os dados completos (URL, categoria, título)

            } catch (err) {
                console.error("Erro ao buscar vídeos com títulos:", err);
                setError(err.message);
                setVideoData([]); // Limpa os dados em caso de erro
            } finally {
                setLoading(false);
            }
        };

        fetchVideosWithTitles(); // Chama a função de busca

    }, [activeCategory]); // Executa sempre que activeCategory mudar

    // ✨ Filtra os vídeos com base no título (que agora vem no videoData)
    const filteredVideos = videoData.filter(video => {
        // Garante que video.title existe e é uma string antes de chamar toLowerCase
        const title = video.title || "";
        return title.toLowerCase().includes(searchQuery.toLowerCase());
    });


    return (
        <div>
            <Header />
            <div className="father">
                <div className="son">
                    <h1 className="paragraph">Vídeos Interativos</h1>

                    {activeCategory ? (
                        <div>
                            <h2 className="selected-category">Categoria: {activeCategory}</h2>

                            {/* Exibe mensagens de carregamento e erro */}
                            {loading && <p>Carregando vídeos...</p>}
                            {error && <p className="error-message">Erro: {error}</p>}

                            {/* Renderiza os vídeos filtrados */}
                            {!loading && !error && filteredVideos.length === 0 ? (
                                <p>Nenhum vídeo encontrado para "{searchQuery}" nesta categoria.</p>
                            ) : (
                                filteredVideos.map((video, index) => (
                                    <div key={video._id || index} className="video-container"> {/* Usa _id se disponível */}
                                        {/* ✨ Exibe o título diretamente do objeto video */}
                                        <h1>{video.title || "Título não disponível"}</h1>
                                        <ReactPlayer
                                            url={video.URLs}
                                            controls
                                            width="100%" // Ajusta a largura para responsividade
                                            // height='auto' // Pode ser necessário ajustar a altura
                                        />
                                    </div>
                                ))
                            )}
                            <button className="back-button" onClick={() => setActiveCategory(null)}>
                                Voltar às categorias
                            </button>
                        </div>
                    ) : (
                        // Renderiza os botões de categoria
                        <div className="containerActivities">
                            <ButtonActivities
                                img={PictureImg}
                                h1="Vídeo musical educativo"
                                paragraph="Clique aqui e veja as opções disponíveis."
                                onClick={() => setActiveCategory("Vídeo musical educativo")}
                            />

                            <ButtonActivities
                                img={MathImg}
                                h1="Vídeo de desenho educativo"
                                paragraph="Clique aqui e veja as opções disponíveis."
                                onClick={() => setActiveCategory("Vídeo de desenho educativo")}
                            />

                            <ButtonActivities
                                img={PortugueseImg}
                                h1={"Filmes gratuitos para educação especial"}
                                paragraph={"Clique aqui e veja as opções disponíveis."}
                                onClick={() => setActiveCategory("Filmes gratuitos no YouTube para educação especial")}
                            />
                        </div>
                    )}
                </div>
                <div className="footer">
                    <p>Os vídeos são atualizados semanalmente para trazer novos conteúdos educativos.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default InteractiveVideos;