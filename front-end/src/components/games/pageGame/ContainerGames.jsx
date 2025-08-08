import GameGalerry from "./GameGallery"
import imgTeste from '../../../assets/activitiesImage.png'
import imgTeste2 from '../../../assets/activitiesLiteracy.png'
import './ContainerGames.css'

function ContainerGames({onViewGame}){
    return(
        <div className="container-wrapper">
            <div className="container-games">
                <div className="selected-game">
                    <GameGalerry
                    img = {imgTeste}
                    tittleGame = {"Jogo da forca"}
                    description = {"Aqui vai ser o jogo da forca"}              
                    stateView ={()=>onViewGame("forca") } 
                    />
                </div>
                <div className="selected-game">
                    <GameGalerry
                    img = {imgTeste2}
                    tittleGame = {"Jogo da velha"}
                    description = {"Aqui vai ser o jogo da velha"}              
                    stateView = {()=>onViewGame("velha")} 
                    />
                </div>
                <div className="selected-game">
                    <GameGalerry
                    img = {imgTeste2}
                    tittleGame = {"Jogo da velha"}
                    description = {"Aqui vai ser o jogo da velha"}              
                    stateView = {()=>onViewGame("velha")} 
                    />
                </div>
                <div className="selected-game">
                    <GameGalerry
                    img = {imgTeste2}
                    tittleGame = {"Jogo da velha"}
                    description = {"Aqui vai ser o jogo da velha"}              
                    stateView = {()=>onViewGame("velha")} 
                    />
                </div>
                 
            </div>
        </div>
            
    )
}

export default ContainerGames