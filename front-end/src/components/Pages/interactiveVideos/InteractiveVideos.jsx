import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import ButtonActivities from "../../button/buttonActivities/ButtonActivities.jsx";
import Header from "../../header/Header.jsx";
import Footer from "../../footer/Footer.jsx";
import PictureImg from "../../../assets/activitiesImage.png";
import MathImg from "../../../assets/activitiesMath.png";
import PortugueseImg from "../../../assets/activitiesPortuguese.png";

import "./InteractiveVideos.css";

function InteractiveVideos() {
    const [activeCategory, setActiveCategory] = useState(null);
    const [videos, setVideos] = useState([]);
    const [titles, setTitles] = useState([]);

    useEffect(() => {
        if (!activeCategory) return;

        const fetchVideos = async () => {
            try {
                const response = await fetch(`http://localhost:8080/uploadVideos?category=${encodeURIComponent(activeCategory)}`);
                if (!response.ok) {
                    throw new Error("Erro ao buscar vídeos");
                }
                const data = await response.json();
                console.log("Vídeos recebidos:", data);
                setVideos(data);
            } catch (error) {
                console.error("Erro ao buscar vídeos:", error);
            }
        };

        fetchVideos();
    }, [activeCategory]);



    useEffect(() => {
        if (videos.length === 0) return;

        const fetchTitles = async () => {
            try {
                const videoIds = videos.map((video) => video.URLs.split("v=")[1]?.split("&")[0]);
                const validIds = videoIds.filter((id) => id);

                if (validIds.length === 0) return;

                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?id=${validIds.join(",")}&key=AIzaSyCDzcDJSzM1oJSi9NUNuoYGv83MisSX2yc&part=snippet` //REPLACE WITH YOUR API KEY
                );
                const data = await response.json();
                setTitles(data.items.map((item) => item.snippet.title));
            } catch (error) {
                console.log("Erro ao buscar títulos dos vídeos", error);
            }
        };

        fetchTitles();
    }, [videos]);

    return (
        <div>
            <Header />
            <div className="father">
                <div className="son">

                    <h1 className="paragraph">Vídeos Interativos</h1>

                    {activeCategory ? (
                        <div>
                            <h2 className="selected-category">Categoria: {activeCategory}</h2>
                            {videos.length === 0 ? (
                                <p>Nenhum vídeo encontrado</p>
                            ) : (
                                videos.map((video, index) => (
                                    <div key={index} className="video-container">
                                        <h1>{titles[index] || "Carregando..."}</h1>
                                        {/*  Remove width and height from ReactPlayer */}
                                        <ReactPlayer url={video.URLs} controls />
                                    </div>
                                ))
                            )}
                            <button className="back-button" onClick={() => setActiveCategory(null)}>
                                Voltar às categorias
                            </button>
                        </div>
                    ) : (
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