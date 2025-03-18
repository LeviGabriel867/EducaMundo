// hangmanGame.js
import React, { useState, useEffect } from 'react'; // Importante importar useState e useEffect
import getWord from './words.js';
import img1 from './img/img1.png';
import img2 from './img/img2.png';
import img3 from './img/img3.png';
import img4 from './img/img4.png';
import img5 from './img/img5.png';
import img6 from './img/img6.png';
import img7 from './img/img7.png'; // Importe todas as imagens
import './hangmanGame.css';

function HangmanGame() {
    const [wordData, setWordData] = useState(null); // Estado para a palavra e a dica
    const [guessedLetters, setGuessedLetters] = useState([]); // Estado para as letras adivinhadas
    const [wrongGuesses, setWrongGuesses] = useState(0); // Estado para as tentativas erradas
    const maxWrongGuesses = 6; // Número máximo de erros

    // useEffect para buscar uma nova palavra quando o componente é montado ou quando se clica em "Novo Jogo"
    useEffect(() => {
        resetGame();
    }, []);

    const resetGame = () => {
        setWordData(getWord());
        setGuessedLetters([]);
        setWrongGuesses(0);
    };


    const handleGuess = (letter) => {
        if (wordData && !guessedLetters.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);

            if (!wordData.word.toUpperCase().includes(letter)) {
                setWrongGuesses(wrongGuesses + 1);
            }
        }
    };

    //Função para determinar se ganhou ou perdeu:
    const gameStatus = () => {
        if (!wordData) return 'loading'; //ainda carregando a palavra
        if (wrongGuesses >= maxWrongGuesses) return 'lost';
        if (wordData.word.toUpperCase().split('').every(letter => guessedLetters.includes(letter))) return 'won';
        return 'playing';
    };

    const status = gameStatus();

    const renderButtons = () => {
        const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)); // Cria um array de A a Z

        return alphabet.map((letter) => (
            <button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={guessedLetters.includes(letter) || status !== 'playing'} // Desabilita se já foi clicado ou o jogo acabou
                className={guessedLetters.includes(letter) ? (wordData.word.toUpperCase().includes(letter) ? 'correct' : 'incorrect') : ''}

            >
                {letter}
            </button>
        ));
    };


    const renderWord = () => {
       if (!wordData) return null; // Não renderiza nada se wordData for null
        return wordData.word.toUpperCase().split('').map((letter, index) => (
            <span key={index} className="letter">
                {guessedLetters.includes(letter) ? letter : '_'}
            </span>
        ));
    };

    const getHangmanImage = () => {
        const images = [img1, img2, img3, img4, img5, img6, img7];
        return images[wrongGuesses] || img7; // Retorna img7 se wrongGuesses for maior que o índice máximo
    };


    return (
        <div className='hangman-container'>
            <h1>Jogo da forca</h1>
            <button className='new' onClick={resetGame}>Novo Jogo</button>

            <article className='content-img'>
                <img src={getHangmanImage()} alt="Jogo da forca" width={250} />
            </article>
            <article className='content'>
                <div className='guess-word'>{renderWord()}</div>
                <div className='clue'>{wordData ? `Dica: ${wordData.clue}` : ''}</div>
                <div className='btns'>{renderButtons()}</div>
                {status === 'lost' && <div className="game-over-message">Você perdeu! A palavra era: {wordData?.word}</div>}
                {status === 'won' && <div className="game-over-message">Você ganhou!</div>}
            </article>
        </div>
    );
}

export default HangmanGame;