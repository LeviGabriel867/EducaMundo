import React from 'react';
import Square from './Square'; // Verifique o caminho correto para Square

// Recebe isAiTurn e passa para cada Square
function Board({ squares, onClick, winningLine, isAiTurn }) {

  const renderSquare = (i) => {
    const isWinningSquare = winningLine && winningLine.includes(i);
    return (
      <Square
        key={i} // Key é importante para performance de listas no React
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinning={isWinningSquare}
        isAiTurn={isAiTurn} // <--- Passa isAiTurn para cada Square
      />
    );
  };

  return (
    <div>
      {/* Renderiza as linhas do tabuleiro */}
      <div className="board-row">
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
    </div>
  );
}

export default Board;