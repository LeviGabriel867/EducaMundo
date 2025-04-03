import { Link } from "react-router-dom";
import logoEducaMundo from "../../../assets/educaMundo.png";
import { useState } from "react";  // Removed useEffect, not needed here
import Lapis from '../../../assets/lapis.png';
import LapisInverter from '../../../assets/lapisInverter.png';
import Login from "../login/Login";
import { useMediaQuery } from 'react-responsive';

import "./HomePage.css";

function HomePage() {
    //const [login, setLogin] = useState(true);
    const [login, setLogin] = useState(false); // Initialize to false
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <>
            {login ? (  //  Check login state *first*
                
                //<HangmanGame/>
                <Login />
            ) : (
                <>
                {isMobile ? (
                    // Mobile Layout
                    <div className="welcome">
                        <div className="grid-container-mobile">
                            <div className="lapis-top-homePage">
                                <div className="lapis-container lapis-top">
                                    <img src={Lapis} alt="lapis" />
                                </div>
                            </div>
                            <div className="content-area-homePage">
                                <div className="content-homePage">
                                    <img src={logoEducaMundo} alt="Ilustração de criança" className="logoEduca-homePage" />
                                    <div className="login-container-homePage">
                                        <Link to="/Services">Clique aqui para entrar</Link>
                                        <p>Grátis e sem cadastro. É só entrar e usar.</p>
                                        <button onClick={() => setLogin(true)} className="login">
                                            Sessão para administrador
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="lapis-bottom-area">
                                <div className="lapis-container lapis-bottom">
                                    <img src={LapisInverter} alt="lapisInverter" />
                                </div>
                            </div>
                        </div>
                    </div>


                ) : (
                    // Desktop Layout
                    <div className="welcome">

                                <div className="left-side">
                                    <h1>EducaMundo</h1>
                                    <h2 id="teste">
                                        Atividades e vídeos educativos para crianças autistas.<br />
                                        Simples de usar, para casa e escola!
                                    </h2>
                                </div>
                                <div className="content-wrapper">
                                    <div className="grid-container">
                                        <div className="lapis-top-area-homePage">
                                            <div className="lapis-container lapis-top">
                                                <img src={Lapis} alt="lapis" />
                                            </div>
                                        </div>
                                        <div className="content-area-homePage">
                                            <div className="content-homePage">
                                                <img src={logoEducaMundo} alt="Ilustração de criança" className="logoEduca" />
                                                <div className="login-container-homePage">
                                                    <Link to="/Services">Clique aqui para entrar</Link>
                                                    <p>Grátis e sem cadastro. É só entrar e usar.</p>
                                                    <button onClick={() => setLogin(true)} className="login">
                                                        Sessão para administrador
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lapis-bottom-homePage">
                                            <div className="lapis-container lapis-bottom">
                                                <img src={LapisInverter} alt="lapisInverter" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    </div>
                )}
                </>

            )}
        </>
    );
}

export default HomePage;