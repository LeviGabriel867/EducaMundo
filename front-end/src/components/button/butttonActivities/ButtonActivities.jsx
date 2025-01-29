function ButtonActivities({ stateFunction, component, img, h1, paragraph, onClick }) {
    return (
        <div style={{ cursor: "pointer" }}>
            {stateFunction ? (
                // Renderiza o componente passado como prop (e.g., Suggestions)
                component
            ) : (
                // Passa o onClick para o ButtonOptions
                <ButtonOptions
                    img={img}
                    h1={h1}
                    paragraph={paragraph}
                    onClick={(onClick)}  // Garante que o onClick seja passado corretamente
                />
            )}
        </div>
    );
}

export default ButtonActivities;
