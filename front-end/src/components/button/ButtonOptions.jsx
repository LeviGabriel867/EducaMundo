//import './ButtonOptions.css'; //AS atividades tmb puxa esse style

function ButtonOptions({ img, h1, paragraph, onClick }) {
    return (
        <div className="ButtonOptions" onClick={onClick} style={{ cursor: "pointer" }}>
            <img src={img} className='Img' alt="Component" />
            <h1>{h1}</h1>
            <p>{paragraph}</p>
        </div>
    );
}

export default ButtonOptions;