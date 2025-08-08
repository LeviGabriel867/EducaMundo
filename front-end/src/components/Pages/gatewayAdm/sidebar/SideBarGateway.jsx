import { FaTimes, FaRegLightbulb } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineVideoSettings } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import SideBarItens from "../sideBarItens/SideBarItens.jsx";
import "./SideBarGateway.css";

function SideBarGateway({
  active,
  setHomePage,
  setViewSuggestionsVisible,
  setUploadVideoVisible,
  setViewActivitiesVisible,
}) {
  const closeSideBar = () => {
    active(false);
  };

  function handleSelect(option) {
    setViewSuggestionsVisible(false);
    setUploadVideoVisible(false);
    setViewActivitiesVisible(false);
  
    if (option === "video") setUploadVideoVisible(true);
    if (option === "suggestions") setViewSuggestionsVisible(true);
    if (option === "activities") setViewActivitiesVisible(true);
  
    setTimeout(() => active(false), 200); 
  }
  
  
  return (
    <div className="sideBarActive">
      <FaTimes onClick={closeSideBar} />
      <br />
      <br />
      <br />
      <br />
      <div className="sideBarGatewayItens">
        <SideBarItens
          Icon={IoHomeOutline}
          text="Home"
          onClick={() => setHomePage(false)}
        />

        <SideBarItens
          Icon={MdOutlineVideoSettings}
          text="Cadastrar Vídeos"
          onClick={() => handleSelect("video")}
        />

        <SideBarItens
          Icon={FaRegLightbulb}
          text="Sugestões dos Usuários"
          onClick={() => handleSelect("suggestions")}
        />

        <SideBarItens 
        Icon={AiOutlinePlusCircle}
        text="Cadastrar Atividades"
        onClick={() => handleSelect("activities")} />
        
      </div>
    </div>
  );
}

export default SideBarGateway;
