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
    const [videoData, setVideoData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { searchQuery } = useSearch();

    const options = [
        {
            img: PictureImg,
            h1: "Vídeo musical educativo",
            paragraph: "Clique aqui e veja as opções disponíveis.",
            onClick: () => setActiveCategory("Vídeo musical educativo"),
        },
        {
            img: MathImg,
            h1: "Vídeo de matemática educativo", // Corrigido
            paragraph: "Clique aqui e veja as opções disponíveis.",
            onClick: () => setActiveCategory("Vídeo de matemática educativo"),
        },
        {
            img: PortugueseImg,
            h1: "Filmes gratuitos para educação especial",
            paragraph: "Clique aqui e veja as opções disponíveis.",
            onClick: () => setActiveCategory("Filmes gratuitos no YouTube para educação especial"),
        }
    ];

    const filteredOptions = options.filter((option) =>
        option.h1.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const fetchVideosWithTitles = async () => {
            if (!activeCategory) {
                setVideoData([]);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:8080/videosWithTitles?category=${encodeURIComponent(activeCategory)}`);

                if (!response.ok) {
                    let errorMsg = `Erro ao buscar vídeos: ${response.status} ${response.statusText}`;
                    try {
                        const errorData = await response.json();
                        errorMsg = errorData.msg || errorMsg;
                    } catch {}
                    throw new Error(errorMsg);
                }

                const data = await response.json();
                console.log("Dados recebidos (vídeos com títulos):", data);
                setVideoData(data);

            } catch (err) {
                console.error("Erro ao buscar vídeos com títulos:", err);
                setError(err.message);
                setVideoData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchVideosWithTitles();
    }, [activeCategory]);

    const filteredVideos = videoData.filter(video => {
        const title = video.title || "";
        return title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div>
            <Header />
            <div className="father">
  <h1 className="paragraph">Vídeos Interativos</h1> {/* Título fora da .son */}

  <div className="son">
    {activeCategory ? (
      // Aqui entra o conteúdo da categoria ativa
      <div className="activeCategoryContent">
        {/* Seu conteúdo para categoria ativa aqui */}
      </div>
    ) : (
      <div className="containerActivitiesInteractive">
        {filteredOptions.map((option, index) => (
          <div key={index} className="activityCard">
            <ButtonActivities
              img={option.img}
              h1={option.h1}
              paragraph={option.paragraph}
              onClick={option.onClick}
            />
          </div>
        ))}
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
