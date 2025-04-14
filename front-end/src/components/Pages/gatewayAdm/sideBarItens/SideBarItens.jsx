import './SideBarItens.css'

function SideBarItens({ Icon, text, onClick }) {
    return (
      <div className="sideBarItens" onClick={onClick}>
        <Icon/>
        <span>{text}</span>        
      </div>
    );
  }
  export default SideBarItens;