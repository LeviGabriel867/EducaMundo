import { useState } from 'react';
import HangmanGame from '../hangmanGame/HangmanGame';
import Game from '../ticTacToe/Game.jsx';
import ContainerGames from './ContainerGames';
import Header from '../../header/Header.jsx';
import Footer from '../../footer/Footer.jsx';
import './HomePageGames.css';

function HomePageGames() {
    const [viewGame, setViewGame] = useState(null);
    const [renderParagraph, setRenderParagraph] = useState(true);

    const handleViewGame = (gameId) => {
        setViewGame(gameId);
        setRenderParagraph(false); 
    };

    const handleBackToGames = () => {
        setViewGame(null);
        setRenderParagraph(true);
    }

    return (
        <>
        <Header />
        <div className="homePageGames">
            {renderParagraph && (
                <div className='paragraph'>
                    <h1 id='paragraphOne'>Diversão e aprendizado esperam por você!</h1>
                    <h1 id='paragraphTwo'>Qual jogo você quer explorar hoje?</h1>
                </div>
            )}

            <div className='container-all-games'>
                {viewGame === "forca" ? (
                    <HangmanGame onBack={handleBackToGames}/>
                ) : viewGame === "velha" ? (
                    <Game onBack={handleBackToGames}/>
                ) : (
                    renderParagraph && <ContainerGames onViewGame={handleViewGame} /> 
                )}
            </div> 
        </div>
        <Footer />
        </>
        
    );
}

export default HomePageGames;