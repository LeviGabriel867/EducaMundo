import React, { useState, useEffect, useCallback } from 'react'; // Importar useCallback
import Board from './Board';
import './TicTacToe.css';

// --- Funções Auxiliares (calculateWinner, findBestMove) ---
// (Coloque as funções calculateWinner e findBestMove aqui - sem alterações nelas)
// Função para calcular o vencedor
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6],           // Diagonais
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] }; // Retorna vencedor e linha
    }
  }
  if (squares.every(square => square !== null)) {
    return { winner: 'Tie', line: null }; // Empate
  }
  return null; // Jogo em andamento
}

// Função para a lógica da IA (simples)
function findBestMove(squares) {
  console.log("[findBestMove] Calculando melhor jogada para o tabuleiro:", squares);

  // 1. Ganhar
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      const t = squares.slice();
      t[i] = 'O';
      if (calculateWinner(t)?.winner === 'O') return i;
    }
  }

  // 2. Bloquear
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      const t = squares.slice();
      t[i] = 'X';
      if (calculateWinner(t)?.winner === 'X') return i;
    }
  }

  // 3. Centro
  if (squares[4] === null) return 4;

  // 4. Canto aleatório
  const corners = [0, 2, 6, 8].filter(i => squares[i] === null);
  if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];

  // 5. Qualquer vazio aleatório
  const empty = squares.map((sq, i) => (sq === null ? i : null)).filter(i => i !== null);
  if (empty.length > 0) return empty[Math.floor(Math.random() * empty.length)];

  console.warn("[findBestMove] Nenhuma jogada válida encontrada.");
  return null;
}

// --- Componente Principal Game ---
function Game({onBack}) {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [gameMode, setGameMode] = useState('PvP');
  const [isAiTurn, setIsAiTurn] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Escolha o modo de jogo");

  const [winningLine, setWinningLine] = useState(null);

  const winnerInfo = calculateWinner(board); // Recalcula a cada render
  const winner = winnerInfo?.winner;

  // --- DEFINIÇÃO DOS HANDLERS ---
  const handleReset = useCallback(() => {
    setBoard(initialBoard);
    setXIsNext(true);
    setWinningLine(null);
    setIsAiTurn(false);
    setGameMode(currentMode => {
      if (currentMode === 'none') {
        setStatusMessage("Escolha o modo de jogo");
      } else {
        setStatusMessage(`Jogo reiniciado (${currentMode}). Próximo jogador: X`);
      }
      return currentMode; // Não mudar o modo ao resetar
    });
  }, [initialBoard]);

  const selectMode = useCallback((mode) => {
    setGameMode(mode);
    setBoard(initialBoard);
    setXIsNext(true);
    setWinningLine(null);
    setIsAiTurn(false);
    setStatusMessage(`Modo ${mode} selecionado. Próximo jogador: X`);
  }, [initialBoard]);

  const handleClick = useCallback((index) => {
    console.log(`[handleClick] Tentando jogar no índice: ${index}`);
    const currentWinnerInfo = calculateWinner(board);
    const currentWinner = currentWinnerInfo?.winner;

    if (currentWinner) {
        console.warn("[handleClick] Jogo já tem um vencedor:", currentWinner);
        return;
    }

    if (board[index]) {
        console.warn("[handleClick] Célula já ocupada no índice:", index);
        return;
    }

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    console.log("[handleClick] Tabuleiro atualizado:", newBoard);
  }, [board, xIsNext]);

  // --- UseEffects ---
  // --- UseEffects ---
  useEffect(() => {
    // Log inicial removido ou simplificado para menos ruído se desejar
    // console.log(`[IA] Effect Check: Mode=${gameMode}, Next=${xIsNext}, Winner=${winner}, isAiTurn=${isAiTurn}`);

    // A condição principal para INICIAR a jogada da IA
    if (gameMode === 'PvE' && !xIsNext && !winner) {
        // Verificação adicional: Só inicia se a IA *não* estiver já pensando
        // Isso evita agendar múltiplos timers se houver algum re-render rápido
        if (!isAiTurn) {
            console.log("[IA] Condições ATENDIDAS (vez da IA e ela não está pensando). Agendando timer...");
            setIsAiTurn(true); // Bloqueia interface

            const timer = setTimeout(() => {
                console.log("[IA Timer] Callback executado.");
                // *** IMPORTANTE: Obter o board MAIS RECENTE aqui dentro ***
                // Usamos a forma funcional de setBoard ou precisamos garantir que 'board' na dep está atualizado
                // Como 'board' ESTÁ na dependencia, ele deve estar ok aqui.
                 const currentBoardSnapshot = board; // Pega o valor atual do closure

                 const aiMoveIndex = findBestMove(currentBoardSnapshot.slice());
                console.log(`[IA Timer] findBestMove retornou: ${aiMoveIndex}`);

                if (aiMoveIndex !== null && currentBoardSnapshot[aiMoveIndex] === null) {
                    console.log(`[IA Timer] Chamando handleClick(${aiMoveIndex})`);
                    handleClick(aiMoveIndex); // Chama o handleClick (que é memoizado e depende de board/xIsNext)
                } else {
                    if(aiMoveIndex !== null) console.warn(`[IA Timer] Célula ${aiMoveIndex} já ocupada? Valor: ${currentBoardSnapshot[aiMoveIndex]}`);
                    else console.warn("[IA Timer] findBestMove não retornou índice.");
                }

                console.log("[IA Timer] Setando isAiTurn = false.");
                setIsAiTurn(false); // Libera interface

            }, 700);

            // Função de limpeza do effect
            return () => {
                console.log("[IA Cleanup] Limpando timer agendado.");
                clearTimeout(timer);
            };
        } else {
            console.log("[IA] Condições atendidas, mas IA já está pensando (isAiTurn=true). Não faz nada.");
        }
    }
     // else { // Opcional: Log para quando as condições principais não são atendidas
         //console.log("[IA] Condições principais NÃO atendidas para iniciar a IA.");
    //}

  // Dependências CRÍTICAS: Quando estas mudam, a *lógica* de decidir se a IA JOGA precisa ser reavaliada.
  // Board: necessário para pegar o snapshot no timer
  // handleClick: necessário para ser chamado no timer (é estável com useCallback)
  // winner: para parar a IA se alguém ganhar
  // gameMode, xIsNext: as condições primárias
  // REMOVIDO 'isAiTurn' para evitar o loop/cancelamento imediato.
  }, [gameMode, xIsNext, winner, board, handleClick]); // Sem isAiTurn

  // useEffect do Status Message (permanece igual)
  useEffect(() => {
    if (winner) { // Verifica se winner não é null (ou seja, 'X', 'O', ou 'Tie')
      if (winner === 'Tie') {
        setStatusMessage("Deu velha! (Empate)"); // Mensagem clara para empate
        setWinningLine(null); // Não há linha vencedora em empate
      } else {
        // Temos um vencedor ('X' ou 'O')
        setStatusMessage(`Jogador ${winner} venceu! Parabéns!`); // Mensagem indicando o vencedor
        // A linha vencedora já deve ser definida corretamente via winnerInfo
        setWinningLine(winnerInfo?.line);
      }
    } else if (gameMode === 'none' || !gameMode) { // Estado inicial ou inválido
      setStatusMessage("Escolha o modo de jogo");
      setWinningLine(null); // Garante que não há linha no início
    } else { // Jogo em andamento
      const player = xIsNext ? 'X' : 'O';
      const computerText = gameMode === 'PvE' && !xIsNext ? ' (Computador)' : '';
      setStatusMessage(`Próximo jogador: ${player}${computerText}`);
      setWinningLine(null); // Garante que não há linha durante o jogo normal
    }
    // As dependências estão corretas. winnerInfo contém o 'winner' que aciona a lógica.
  }, [winnerInfo, xIsNext, gameMode]); // winnerInfo inclui winner e line
  // --- Renderização ---
  return (
    <div className="game">
      <h1>Jogo da Velha Adaptado</h1>
      <div className="game-mode-selector">
        <button onClick={() => selectMode('PvP')} disabled={gameMode === 'PvP'} className={gameMode === 'PvP' ? 'active-mode' : ''}>
          Jogador vs Jogador
        </button>
        <button onClick={() => selectMode('PvE')} disabled={gameMode === 'PvE'} className={gameMode === 'PvE' ? 'active-mode' : ''}>
          Jogador vs Inteligência Artificial
        </button>
      </div>

      {(gameMode === 'PvP' || gameMode === 'PvE') && (
        <div className="game-board">
          <Board
            squares={board}
            onClick={handleClick}
            winningLine={winningLine}
            isAiTurn={isAiTurn}
          />
        </div>
      )}

      <div className="game-info">
        <div>{statusMessage}</div>
        {(gameMode === 'PvP' || gameMode === 'PvE') && (
          <button onClick={handleReset} className="reset-button">Reiniciar Jogo</button>
          
        )}
        <button className='backPage-Game' onClick={onBack}>Voltar</button>
      </div>
    </div>
  );
}

export default Game;