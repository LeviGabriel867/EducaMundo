function GameGallery({img ,tittleGame, description, stateView}){
    return(
        <div className="container-itens-games" onClick={stateView}>
                <img src={img} alt="img-game" className="img-game" />
                <h1 className="title-game">{tittleGame}</h1>
                <p className="paragraph-game">{description}</p>            
        </div>
    )
}

export default GameGallery;