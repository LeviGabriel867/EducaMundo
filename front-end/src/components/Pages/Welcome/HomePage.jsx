import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Kid from '../../../assets/kidHomePage.png'
import educaMundo from '../../../assets/educaMundo.png'
import Login from "../login/Login";
import './HomePage.css'
import { useState } from "react";

function HomePage(){
    
    const [login, setLogin] = useState(null)

   
    return(
        
        <div className="welcome" >
             {login ? (
                <Login/>
            ): (
                <>
                <div className="scrennStart">
                <h1>Bem-vindo(a) ao EducaMundo</h1>
                <img src={Kid} alt="Ilustração de criança" className="kidImage"/>
                <Link to="/Intro">Clique aqui para entrar</Link>
                <img src={educaMundo} alt="educaMundo" className="educaMundoImage" />

                <button onClick={()=> setLogin(true)}>Login</button>
            </div>
                
            
                </>
            )}
            
        </div>
    )
}

export default HomePage