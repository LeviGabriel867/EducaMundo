import './Footer.css'
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

function Footer(){
    return(
       <footer className="services-system__footer">
        <FaInstagram className="footer-icon" />
        <FaWhatsapp className="footer-icon" />
        <p>EducaMundo ©2025. Todos os direitos reservados.</p>
    </footer> 
    )
    
    
}

export default Footer