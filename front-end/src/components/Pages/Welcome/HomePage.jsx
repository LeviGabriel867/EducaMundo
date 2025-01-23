import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Kid from '../../../assets/kidHomePage.png'
import './HomePage.css'

function HomePage(){
    return(
        <div className="welcome" >
            <div className="scrennStart">
                <h1>Bem-vindo(a) ao EducaMundo</h1>
                <img src={Kid} alt="Ilustração de criança" className="kidImage"/>
                <Link to="/Intro">Clique aqui para entrar</Link>
            </div>
            
        </div>
    )
}

export default HomePage