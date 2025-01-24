import { Link } from 'react-router-dom';
import './Button.css'
function ButtonComponent({ toComponent, text }) {
    return (
        <Link to={toComponent} className="Button">
            {text}
        </Link>
    );
}

export default ButtonComponent;
