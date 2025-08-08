import "./MainContent.css";
import { useState } from "react";
import CustomDropdown from "../../login/CustomDropdown";
import UploadVideo from "../../login/UploadVideo";
import SuggestionsUsers from "../../login/SuggetionsUsers";
import SuggestionsPage from "../../suggestions/SuggestionsPage";

function MainContent({
  uploadVideoVisible,
  viewSuggestionsVisible,
  viewActivitiesVisible,
  setTypeUser,
  viewSuggestionsPageVisible,
  setViewSuggestionsPageVisible,
}) {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [fileName, setFileName] = useState("Nenhum arquivo escolhido");
  const [img, setImg] = useState("");
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [category, setCategory] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        setMessage("Apenas arquivos de imagem são permitidos (jpeg, png, gif, webp)." );
        setIsVisible(true);
        setImg("");
        setFileName("Nenhum arquivo escolhido");
        setTimeout(() => setIsVisible(false), 2500);
        setTimeout(() => setMessage(""), 3500);
        return;
      }
      setFileName(file.name);
      setImg(file);
    }
  };

  const handleClick = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", img);

    try {
      const response = await fetch("http://localhost:8080/api/activities/single", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("Atividade enviada com sucesso!");
        setIsVisible(true);

        setName("");
        setCategory("");
        setDescription("");
        setImg("");
        setFileName("Nenhum arquivo escolhido");

        setTimeout(() => setIsVisible(false), 2500);
        setTimeout(() => setMessage(""), 3500);
      } else {
        setMessage(data.msg || "Erro ao enviar atividade");
        setIsVisible(true);

        setTimeout(() => setIsVisible(false), 2500);
        setTimeout(() => setMessage(""), 3500);
      }
    } catch (error) {
      console.error("Erro no envio da atividade", error);
      setMessage("Erro ao conectar ao servidor");
      setIsVisible(true);

      setTimeout(() => setIsVisible(false), 2500);
      setTimeout(() => setMessage(""), 3500);
    }
  };

  const categories = [
    "Atividade de pintura",
    "Atividade de matemática básica",
    "Atividade de português",
    "Atividade de alfabetização",
  ];

  return (
    <div className="main-content">
      <div className="top-right-box">
        {/* Bloco de atividades */}
        {viewActivitiesVisible && (
          <div className="input-container-upload">
            <label id="labelMainContent" htmlFor="">
              Disponibilize suas atividades
            </label>
            <br />
            <input
              id="inputOne"
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Nome da atividade"
            />
            <br />
            <input
              id="inputOne"
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Descrição da atividade"
            />

            <div className="row-aligned-elements">
              <CustomDropdown
                options={categories}
                selected={category}
                setSelected={setCategory}
              />
              <div className="label-file-container">
                <label
                  htmlFor="file-upload"
                  className="label-file"
                  id="label-file"
                >
                  Escolher arquivo
                </label>
                <input
                  id="file-upload"
                  className="input-file"
                  type="file"
                  onChange={handleFileChange}
                />
                <p className="file-name">{fileName}</p>
              </div>
            </div>

            <div className="buttons">
              <button
                id="submit-main-content"
                onClick={() => setTypeUser(true)}
              >
                Retornar
              </button>
              <button id="submit-main-content" onClick={handleClick}>
                Cadastrar
              </button>
            </div>
          </div>
        )}

        {/* Bloco de Upload de Vídeo */}
        {uploadVideoVisible && <UploadVideo />}

        {/* Bloco de Sugestões */}
        {viewSuggestionsVisible && !viewSuggestionsPageVisible && (
          <SuggestionsUsers
            setViewSuggestionsPageVisible={setViewSuggestionsPageVisible}
          />
        )}

        {viewSuggestionsVisible && viewSuggestionsPageVisible && (
          <SuggestionsPage
            setViewSuggestionsPageVisible={setViewSuggestionsPageVisible}
          />
        )}

        {/* Mensagem de status */}
        {message && (
          <p className={`message ${isVisible ? "" : "hidden"}`}>{message}</p>
        )}
      </div>
    </div>
  );
}

export default MainContent;
