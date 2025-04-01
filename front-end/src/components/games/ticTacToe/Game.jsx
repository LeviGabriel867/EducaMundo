import React, { useState, useEffect } from 'react';
import Board from './Board'; // Importe o componente Board
import './TicTacToe.css'; // Arquivo para estilos

// Função auxiliar para verificar o vencedor
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6],           // Diagonais
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] }; // Retorna o vencedor e a linha
    }
  }
  // Verificar empate (nenhum quadrado vazio)
  if (squares.every(square => square !== null)) {
    return { winner: 'Tie', line: null };
  }
  return null; // Jogo em andamento
}

// Função para a lógica da IA (exemplo muito simples)
function findBestMove(squares) {
  // 1. Tentar ganhar
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      const testSquares = squares.slice();
      testSquares[i] = 'O'; // Tenta jogar como 'O' (IA)
      if (calculateWinner(testSquares)?.winner === 'O') {
        return i; // Encontrou jogada vencedora
      }
    }
  }

  // 2. Tentar bloquear o jogador 'X'
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      const testSquares = squares.slice();
      testSquares[i] = 'X'; // Tenta simular a jogada do 'X'
      if (calculateWinner(testSquares)?.winner === 'X') {
        return i; // Encontrou jogada de bloqueio
      }
    }
  }

   // 3. Tentar pegar o centro se estiver livre
   if (squares[4] === null) {
    return 4;
   }

  // 4. Tentar pegar um canto aleatório se estiver livre
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => squares[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // 5. Jogar em qualquer quadrado vazio aleatório (fallback)
  const emptySquares = squares
    .map((sq, index) => (sq === null ? index : null))
    .filter(index => index !== null);

  if (emptySquares.length > 0) {
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }

  return null; // Não deveria acontecer em um jogo normal
}


function Game() {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true); // 'X' sempre começa
  const [gameMode, setGameMode] = useState('PvP'); // 'PvP' ou 'PvE'
  const [isAiTurn, setIsAiTurn] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Escolha o modo de jogo");
  const [winningLine, setWinningLine] = useState(null); // Para destacar a linha vencedora

  const winnerInfo = calculateWinner(board);
  const winner = winnerInfo?.winner;

  // Efeito para a jogada da IA
  useEffect(() => {
    // Só roda se: modo PvE, é a vez do 'O' (IA), e o jogo não acabou
    if (gameMode === 'PvE' && !xIsNext && !winner && !isAiTurn) {
       setIsAiTurn(true); // Marca que a IA está pensando
       // Adiciona um pequeno delay para parecer que a IA está "pensando"
       const timer = setTimeout(() => {
        const aiMoveIndex = findBestMove(board);
        if (aiMoveIndex !== null) {
          handleClick(aiMoveIndex); // Simula o clique da IA
        }
        setIsAiTurn(false); // Marca que a IA terminou
       }, 500); // Delay de 0.5 segundos

       return () => clearTimeout(timer); // Limpa o timeout se o componente desmontar
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xIsNext, gameMode, winner, board]); // Dependências do efeito


  // Atualiza a mensagem de status
  useEffect(() => {
    if (winner) {
      if (winner === 'Tie') {
        setStatusMessage("Empate!");
      } else {
        setStatusMessage(`Vencedor: ${winner}`);
      }
      setWinningLine(winnerInfo?.line); // Define a linha vencedora
    } else if (gameMode === 'none') {
       setStatusMessage("Escolha o modo de jogo");
    }
     else {
      setStatusMessage(`Próximo jogador: ${xIsNext ? 'X' : 'O'}${gameMode === 'PvE' && !xIsNext ? ' (Computador)' : ''}`);
       setWinningLine(null); // Limpa a linha vencedora se o jogo recomeçar
    }
  }, [winner, xIsNext, gameMode, winnerInfo]);


  const handleClick = (index) => {
    // Ignora clique se já houver vencedor, o quadrado estiver preenchido,
    // ou se for a vez da IA no modo PvE e o clique for humano
    if (winner || board[index] || (gameMode === 'PvE' && !xIsNext && !isAiTurn)) {
       // Se for a vez da IA, mas o clique veio do useEffect da IA, permite
       if (isAiTurn && gameMode === 'PvE' && !xIsNext){
           // Continua para a lógica de atualização abaixo
       } else {
            return; // Ignora o clique em outras condições
       }
    }


    const newBoard = board.slice(); // Cria uma cópia do tabuleiro
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext); // Alterna o jogador
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setXIsNext(true);
    setWinningLine(null);
    setIsAiTurn(false);
    // Não reseta o gameMode, mantém a escolha do usuário
    setStatusMessage(`Próximo jogador: X`); // Reinicia status
     if (gameMode === 'none') {
        setStatusMessage("Escolha o modo de jogo");
     } else {
        setStatusMessage(`Jogo reiniciado (${gameMode}). Próximo jogador: X`);
     }
  };

  const selectMode = (mode) => {
    setGameMode(mode);
    handleReset(); // Reseta o tabuleiro ao trocar de modo
     setStatusMessage(`Modo ${mode} selecionado. Próximo jogador: X`);
  }

  return (
    <div className="game">
        <h1>Jogo da Velha Adaptado</h1>
        <div className="game-mode-selector">
            <button onClick={() => selectMode('PvP')} disabled={gameMode === 'PvP'} className={gameMode === 'PvP' ? 'active-mode' : ''}>
                Jogador vs Jogador
            </button>
            <button onClick={() => selectMode('PvE')} disabled={gameMode === 'PvE'} className={gameMode === 'PvE' ? 'active-mode' : ''}>
                Jogador vs Computador
            </button>
        </div>

      {gameMode !== 'none' && ( // Só mostra o jogo se um modo foi selecionado
        <div className="game-board">
           {/* Passa a linha vencedora para o Board */}
          <Board squares={board} onClick={handleClick} winningLine={winningLine} />
        </div>
      )}

      <div className="game-info">
        <div>{statusMessage}</div>
         {/* Mostra botão de reset apenas se um modo foi selecionado */}
        {gameMode !== 'none' && (
             <button onClick={handleReset} className="reset-button">Reiniciar Jogo</button>
        )}
      </div>
    </div>
  );
}

export default Game;