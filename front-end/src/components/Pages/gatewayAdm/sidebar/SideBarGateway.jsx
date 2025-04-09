import { FaTimes,FaRegLightbulb   } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineVideoSettings } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";


import SideBarItens from "../sideBarItens/SideBarItens.jsx";

import "./SideBarGateway.css"
function SideBarGateway({ active }) {

    const closeSideBar = () => {
        active(false);
    };

    return (
        <div className="sideBarActive">
            <FaTimes onClick={closeSideBar} /> 
            <br />
            <br />
            <br />
            <br />
            <div className="sideBarGatewayItens">
                <SideBarItens Icon={IoHomeOutline} text="Home" />
                <SideBarItens Icon={MdOutlineVideoSettings} text="Cadastrar Vídeos" />
                <SideBarItens Icon={FaRegLightbulb } text="Sugestões dos Usuários" />
                <SideBarItens Icon={AiOutlinePlusCircle} text="Cadastrar Atividades" />
            </div>
        </div>
    );
}

export default SideBarGateway;
