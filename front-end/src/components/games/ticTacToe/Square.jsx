import React from 'react';

// Recebe isAiTurn e usa para desabilitar o botão
function Square({ value, onClick, isWinning, isAiTurn }) {
  const className = `square ${isWinning ? 'winning' : ''} ${value ? 'filled' : ''}`;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={isAiTurn} // <--- Desabilita o botão se for a vez da IA
    >
      {/* Span para estilizar X e O separadamente se necessário */}
      <span className={value === 'X' ? 'symbol-x' : value === 'O' ? 'symbol-o' : ''}>
         {value}
      </span>
    </button>
  );
}

export default Square;