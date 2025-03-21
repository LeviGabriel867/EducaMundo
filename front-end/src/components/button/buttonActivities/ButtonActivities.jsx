import ButtonOptions from  '../ButtonOptions.jsx'
import './ButtonActivities.css'

function ButtonActivities({ shouldShowComponent, Component, img, h1, paragraph, onClick }) {
    return (
        <div className='container' style={{ cursor: "pointer" }}>
            {shouldShowComponent ? (
                <Component />  // Renderizando o componente corretamente
            ) : (
                <ButtonOptions
                    img={img}
                    h1={h1}
                    paragraph={paragraph}
                    onClick={onClick}
                />
            )}
        </div>
    );
}

export default ButtonActivities;
