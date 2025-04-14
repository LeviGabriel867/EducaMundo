import { useState } from "react";
import HomePageComponent from "../welcome/HomePage";
import CustomDropdown from "./CustomDropdown";
import UploadVideo from "../login/UploadVideo.jsx";
import SuggestionsUsers from "./SuggetionsUsers";
import laptop from "../../../assets/laptop.png";
import Lapis from "../../../assets/lapis.png";
import LapisInverter from "../../../assets/lapisInverter.png";
import abc from "../../../assets/criançasABC.png";
import { useMediaQuery } from "react-responsive";
import GatewayAdm from "../gatewayAdm/gatewayAdm.jsx";
import SideBarGateway from "./sidebar/sideBarGateway.jsx";
import HeaderGateway from "../gatewayAdm/headerGatewayAdm/HeaderGateway.jsx";
import "./Login.css";



function Login() {
  
  const [homePage, setHomePage] = useState(true);
  const [typeUser, setTypeUser] = useState(true);
  const [uploadVideo, setUploadVideo] = useState(true);
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [fileName, setFileName] = useState("Nenhum arquivo escolhido");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false); // Estado para controlar a visibilidade
  const [isLogin, setIsLogin] = useState(true);
  const [viewSuggestions, setViewSuggestions] = useState(true); // Controla a visibilidade do ViewSuggestions
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [sideBar, setSideBar] = useState(false);

  const showSidebar = () => setSideBar(!sideBar);

  const categories = [
    "Atividade de pintura",
    "Atividade de matemática básica",
    "Atividade de português",
    "Atividade de alfabetização",
    "Atividade surpresa",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin
      ? "http://localhost:4080/auth/login"
      : "http://localhost:4080/auth/register";

    const data = isLogin
      ? { email, password }
      : { email, password, confirmpassword: confirmPassword };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(
          isLogin
            ? "Login realizado com sucesso!"
            : "Cadastro realizado com sucesso!"
        );
        setIsVisible(true);

        setTimeout(() => {
          setIsVisible(false); // Começa o fade-out
        }, 2500);

        setTimeout(() => {
          setMessage(""); // Remove a mensagem completamente
        }, 3500);

        if (isLogin) {
          localStorage.setItem("token", result.token);
          setTypeUser(false); // Ir para a próxima tela ao fazer login
          setUploadVideo(true); // Resetar o estado uploadVideo
        }
      } else {
        setMessage(result.message || "Usúario não cadastrado.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setMessage("Erro ao conectar ao servidor.");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setImg(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    setUploadVideo(false);
  };

  const handleClick = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", img);

    try {
      const response = await fetch("http://localhost:8080/single", {
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

        setTimeout(() => {
          setIsVisible(false); // Começa o fade-out
        }, 2500);

        setTimeout(() => {
          setMessage("");
        }, 3500);
      } else {
        setMessage(data.msg || "Erro ao enviar atividade");
        setIsVisible(true);

        setTimeout(() => {
          setIsVisible(false);
        }, 2500);

        setTimeout(() => {
          setMessage("");
        }, 3500);
      }
    } catch (error) {
      console.error("Error no envio da atividade", error);
      setMessage("Erro ao conectar ao servidor");
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 2500);

      setTimeout(() => {
        setMessage("");
      }, 3500);
    }
  };

  return (
    <div>
      {homePage ? (
         <div>
          
         </div>
          ) : (
            <div className="container-activities">
              {viewSuggestions ? (
                <>
                  {uploadVideo ? (
                    <div className="container-admPortal">
                      <h1>Portal administrativo</h1>


                      <HeaderGateway showSideBar={showSidebar}/>
                      {sideBar && <SideBarGateway active={setSideBar} />}
                      <GatewayAdm/>

                      
                      <div className="left-side-admPortal">
                        <nav className="menu-left">
                                        {/* Button to SWITCH to Video Upload View */}
              <button
                id="button-switch-to-video"
                onClick={() => 56(false)} // Sets uploadVideo to false
              >
                Cadastrar vídeo
              </button>
              
              <SuggestionsUsers
              onViewSuggestionsClick={() => setViewSuggestions(false)}
            />  
              {/* Add other admin menu items here if needed */}
                      
                        </nav>
                      </div>
                      <div className="resume">
                        <h2>Resumo</h2>
                        <p>Usuários ativos: 10</p>
                        <p>Sugestões pedentes: 05</p>
                      </div>
                      <div className="input-container-upload">
                       
                        <div className="selectedSuggestions">
                          <div className="label-file-container">
                            <label htmlFor="file-upload" className="label-file">
                              Escolher arquivo
                            </label>
                            <input
                              id="file-upload"
                              className="input-file"
                              type="file"
                              onChange={handleFileChange}
                            />
                            <p className="file-name">{fileName}</p>{" "}
                            {/* Exibe o nome do arquivo */}
                          </div>
                        </div>
                        <div className="buttons">
                          <button id="submit" onClick={() => setTypeUser(true)}>
                            Retornar
                          </button>
                          <button id="submit" onClick={handleClick}>
                            Cadastrar
                          </button>
                        </div>
                      </div>

                      <br />

                      <div className="options">
                        <br />
                        
                        </div>
                      {message && (
                        <p className={`message ${isVisible ? "" : "hidden"}`}>
                          {message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <>
                      <UploadVideo />
                      <button
                        id="button-uploadVideo"
                        onClick={() => setUploadVideo(true)}
                      >
                        Cadastrar atividade
                      </button>
                    </>
                  )}
                </>
              ) : (
                <SuggestionsUsers
                  onViewSuggestionsClick={() => setViewSuggestions(true)}
                />
              )}
            </div>
          )}
        </>
      ) : (
        <HomePageComponent />
      )}
    </div>
  );
}

export default Login;
