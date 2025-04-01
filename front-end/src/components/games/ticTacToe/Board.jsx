import React from 'react';
import Square from './Square.jsx'; // Importe o componente Square

function Board({ squares, onClick, winningLine }) {
  const renderSquare = (i) => {
    // Verifica se o quadrado faz parte da linha vencedora
    const isWinningSquare = winningLine && winningLine.includes(i);
    return (
      <Square
        key={i} // Key é importante para listas no React
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinning={isWinningSquare} // Passa a prop para destacar
      />
    );
  };

  return (
    <div>
      {/* Cria as linhas do tabuleiro */}
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

export default Board;