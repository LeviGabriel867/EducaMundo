import { useState } from "react";
import {FaBars} from "react-icons/fa";
import SideBarHeader from '../sidebar/SideBarGateway.jsx'
import "./HeaderGateway.css";
function HeaderGateway({showSideBar}) {


  return (
    <div className="headerGatewayAdm">
        <FaBars onClick={showSideBar}/>
    </div>
     
    
  );
}
export default  HeaderGateway;