import { useState } from "react";
import HomePageComponent from "../welcome/HomePage";
import CustomDropdown from "./CustomDropdown";
import UploadVideo from "./UploadVideo";
import SuggestionsUsers from "./SuggetionsUsers";
import laptop from "../../../assets/laptop.png";
import Lapis from "../../../assets/lapis.png";
import LapisInverter from "../../../assets/lapisInverter.png";
import abc from "../../../assets/criançasABC.png";
import { useMediaQuery } from "react-responsive";
import GatewayAdm from "../gatewayAdm/gatewayAdm.jsx";
import SideBarGateway from "../gatewayAdm/sidebar/SideBarGateway.jsx";
import "./Login.css";
import HeaderGateway from "../gatewayAdm/headerGatewayAdm/HeaderGateway.jsx";

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
        <>
          {typeUser ? (
            <>
              {isMobile ? (
                <div className="container-right">
                  <div className="content">
                    <div className="lapis-top-area">
                      <div className="lapis-container-top"></div>
                      <img src={Lapis} alt="lapis" />
                    </div>
                  </div>
                  <div className="content-area-login">
                    <div className="content">
                      <img src={abc} alt="image-abc" className="abc-login" />
                      <h2>
                        Para oferecer os melhores conteúdos ao seus alunos,
                        acesse sua conta!
                      </h2>
                      <div className="form-login">
                        <form onSubmit={handleSubmit}>
                          <div className="input-container">
                            <label htmlFor="email">E-mail:</label>
                            <input
                              type="text"
                              id="email"
                              required
                              placeholder="Digite seu email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>

                          <div className="input-container">
                            <label htmlFor="password">Senha:</label>
                            <input
                              type="password"
                              id="password"
                              required
                              placeholder="Digite sua senha"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>

                          {!isLogin && (
                            <div className="input-container">
                              <label htmlFor="confirm-password">
                                Confirmar senha:
                              </label>
                              <input
                                type="password"
                                id="confirm-password"
                                required
                                placeholder="Confirme sua senha"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                              />
                            </div>
                          )}

                          {message && (
                            <p
                              className={`message ${isVisible ? "" : "hidden"}`}
                            >
                              {message}
                            </p>
                          )}

                          <div className="button-container">
                            <button id="submit" type="submit">
                              {isLogin ? "Login" : "Cadastrar"}
                            </button>
                            <button
                              id="submit"
                              type="button"
                              onClick={() => setIsLogin(!isLogin)}
                            >
                              {isLogin ? "Criar conta" : "Já tenho conta"}
                            </button>
                            <button
                              id="submit"
                              type="button"
                              onClick={() => setHomePage(false)}
                            >
                              Página inicial
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="lapis-bottom">
                    <div className="lapis-container-bottom">
                      <img src={LapisInverter} alt="lapisInverter" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="container-login">
                  <div className="left-side">
                    <div className="header-left-side">
                      <h1>EducaMundo</h1>
                      <h2>Educação feita para todos.</h2>
                    </div>

                    <h1>Bem-vindo(a) administrador(a)</h1>
                    <h2>
                      Para oferecer os melhores conteúdos ao seus alunos, acesse
                      sua conta!
                    </h2>
                    <img src={laptop} alt="laptop" />
                  </div>

                  <div className="container-right">
                    <div className="content">
                      <div className="lapis-top-area">
                        <div className="lapis-container-top"></div>
                        <img src={Lapis} alt="lapis" />
                      </div>
                    </div>
                    <div className="content-area-login">
                      <div className="content">
                        <img src={abc} alt="image-abc" className="abc-login" />
                        <div className="form-login">
                          <form onSubmit={handleSubmit}>
                            <div className="input-container">
                              <label htmlFor="email">E-mail:</label>
                              <input
                                type="text"
                                id="email"
                                required
                                placeholder="Digite seu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>

                            <div className="input-container">
                              <label htmlFor="password">Senha:</label>
                              <input
                                type="password"
                                id="password"
                                required
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </div>

                            {!isLogin && (
                              <div className="input-container">
                                <label htmlFor="confirm-password">
                                  Confirmar senha:
                                </label>
                                <input
                                  type="password"
                                  id="confirm-password"
                                  required
                                  placeholder="Confirme sua senha"
                                  value={confirmPassword}
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                />
                              </div>
                            )}

                            {message && (
                              <p
                                className={`message ${
                                  isVisible ? "" : "hidden"
                                }`}
                              >
                                {message}
                              </p>
                            )}

                            <div className="button-container">
                              <button id="submit" type="submit">
                                {isLogin ? "Login" : "Cadastrar"}
                              </button>
                              <button
                                id="submit"
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                              >
                                {isLogin ? "Criar conta" : "Já tenho conta"}
                              </button>
                              <button
                                id="submit"
                                type="button"
                                onClick={() => setHomePage(false)}
                              >
                                Página inicial
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="lapis-bottom">
                      <div className="lapis-container-bottom">
                        <img src={LapisInverter} alt="lapisInverter" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="container-activities">
              <nav className="menu-left">
                <h1>Painel do Administrador</h1>
                <HeaderGateway showSideBar={showSidebar}/>
                {sideBar && <SideBarGateway active={setSideBar} />}
                <GatewayAdm/>
                <button onClick={() => setUploadVideo(true)}>Cadastrar Vídeo</button>
                <button onClick={() => setViewSuggestions(true)}>Visualizar Sugestões</button>
              </nav>

              <div className="main-content">
                {uploadVideo && (
                  <>
                    <div className="resume">
                      <h2>Resumo</h2>
                      <p>Atividades cadastradas: 12</p>
                      <p>Usuários ativos: 35</p>
                      <p>Sugestões pendentes: 5</p>
                    </div>

                    <div className="input-container-upload">
                      <h2>Nova Atividade</h2>
                      <label htmlFor="activity-name">Nome da atividade</label>
                      <input
                        id="activity-name"
                        type="text"
                        placeholder="Nome da atividade"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <label htmlFor="activity-description">Descrição</label>
                      <textarea
                        id="activity-description"
                        placeholder="Descrição"
                        rows="4"
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                      <button onClick={handleClick}>Cadastrar</button>
                    </div>
                  </>
                )}

                {!uploadVideo && (
                  <div>
                    <UploadVideo />
                    <button onClick={() => setUploadVideo(true)}>Cadastrar Atividade</button>
                  </div>
                )}

                {viewSuggestions && (
                  <SuggestionsUsers
                    onViewSuggestionsClick={() => setViewSuggestions(false)}
                  />
                )}
              </div>
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
