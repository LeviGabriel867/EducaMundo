import { useState } from "react";
import HomePageComponent from "../welcome/HomePage";
import CustomDropdown from "./CustomDropdown";
import UploadVideo from "./UploadVideo";
import SuggestionsUsers from "./SuggetionsUsers";
import ViewSuggestions from './ViewSuggestions';
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
    const [isLogin, setIsLogin] = useState(true);
    const [viewSuggestions, setViewSuggestions] = useState(true); // Controla a visibilidade do ViewSuggestions

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

        const data = isLogin ? { email, password } : { email, password, confirmpassword: confirmPassword };

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
                setMessage(isLogin ? "Login realizado com sucesso!" : "Cadastro realizado com sucesso!");

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

    const handleClick = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("image", img);

        fetch("http://localhost:8080/single", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                console.log(res.msg);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            {homePage ? (
                <>
                    {typeUser ? (
                        <div className="container-login">
                            <h1>SEÇÃO DE ADMINISTRADOR</h1>
                            <h1>Insira suas credenciais</h1>
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
                                        <label htmlFor="confirm-password">Confirmar senha:</label>
                                        <input
                                            type="password"
                                            id="confirm-password"
                                            required
                                            placeholder="Confirme sua senha"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                )}

                                {message && <p className="message">{message}</p>}

                                <div className="button-container">
                                    <button id="submit" type="submit">{isLogin ? "Login" : "Cadastrar"}</button>
                                    <button id="submit" type="button" onClick={() => setIsLogin(!isLogin)}>
                                        {isLogin ? "Criar conta" : "Já tenho conta"}
                                    </button>
                                    <button id="submit" type="button" onClick={() => setHomePage(false)}>Página inicial</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="container-activities">
                            {viewSuggestions ? (
                                <>
                                    {uploadVideo ? (
                                        <>
                                            <h1>Escolha a atividade e sua categoria</h1>
                                            <div className="input-container-upload">
                                                <input id="inputOne"
                                                    onChange={(e) => setName(e.target.value)}
                                                    type="text"
                                                    placeholder="Nome da atividade"
                                                />
                                                <br />
                                                <input
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    type="text"
                                                    placeholder="Descrição da atividade"
                                                />
                                            </div>

                                            <CustomDropdown options={categories} selected={category} setSelected={setCategory} />

                                            <br />
                                            <label htmlFor="file-upload" className="label-file">
                                                Escolher arquivo
                                            </label>
                                            <input
                                                id="file-upload"
                                                className="input-file"
                                                type="file"
                                                onChange={handleFileChange}
                                            />
                                            <div className="file">
                                                <label>Arquivo selecionado:</label>
                                                <p>{fileName}</p>
                                            </div>

                                            <div className="buttons">
                                                <button id="submit" onClick={() => setTypeUser(true)}>Retornar</button>
                                                <button id="submit" onClick={handleClick}>Cadastrar</button>
                                            </div>

                                            <div className="options">
                                                <br />
                                                <button id="button-uploadVideo" onClick={handleUpload}>Cadastrar vídeo</button>
                                                <SuggestionsUsers onViewSuggestionsClick={() => setViewSuggestions(false)} />

                                            </div>

                                        </>
                                    ) : (
                                        <>
                                            <UploadVideo />
                                            <h4>Ou</h4>
                                            <button id="button-uploadVideo" onClick={() => setUploadVideo(true)}>Cadastrar atividade</button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <ViewSuggestions />
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