import './SideBarItens.css'

function SideBarItens({ Icon, text }) {
    return (
      <div className="sideBarItens">
        <Icon/>
        {text}
        
      </div>
    );
  }
  export default SideBarItens;