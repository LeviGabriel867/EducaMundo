import React, { useState, useEffect } from 'react'; 
import getWord from './words.js';
import img1 from './img/img1.png';
import img2 from './img/img2.png';
import img3 from './img/img3.png';
import img4 from './img/img4.png';
import img5 from './img/img5.png';
import img6 from './img/img6.png';
import img7 from './img/img7.png'; 
import './hangmanGame.css';

function HangmanGame({ onBack }) {
    const [wordData, setWordData] = useState(null);
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const maxWrongGuesses = 6;

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

    const renderButtons = () => {
        const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

        return alphabet.map((letter) => (
            <button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={guessedLetters.includes(letter)}
                className={guessedLetters.includes(letter) ? (wordData.word.toUpperCase().includes(letter) ? 'correct' : 'incorrect') : ''}
            >
                {letter}
            </button>
        ));
    };

    const renderWord = () => {
        if (!wordData) return null;
        return wordData.word.toUpperCase().split('').map((letter, index) => (
            <span key={index} className="letter">
                {guessedLetters.includes(letter) ? letter : '_'}
            </span>
        ));
    };

    const getHangmanImage = () => {
        const images = [img1, img2, img3, img4, img5, img6, img7];
        return images[wrongGuesses] || img7;
    };

    return (
        <div className='hangman-container'>
            <h1>Jogo da forca</h1>

            <article className='content-img'>
                <img src={getHangmanImage()} alt="Jogo da forca" width={250} />
            </article>
            <article className='content'>
                <div className='guess-word'>{renderWord()}</div>
                <div className='clue'>{wordData ? `Dica: ${wordData.clue}` : ''}</div>
                <div className='btns'>{renderButtons()}</div>
            </article>

            <button className='new' onClick={resetGame}>Novo Jogo</button>
            <button className='backPage' onClick={onBack}>Voltar</button>
        </div>
    );
}

export default HangmanGame;