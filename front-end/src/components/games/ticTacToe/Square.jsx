import React from 'react';

// Recebe a prop isWinning
function Square({ value, onClick, isWinning }) {
  // Adiciona a classe 'winning' se for parte da linha vencedora
  const className = `square ${isWinning ? 'winning' : ''} ${value ? 'filled' : ''}`;
  return (
    <button className={className} onClick={onClick}>
      {/* Adiciona classes específicas para X e O para estilização */}
      <span className={value === 'X' ? 'symbol-x' : value === 'O' ? 'symbol-o' : ''}>
         {value}
      </span>
    </button>
  );
}

export default Square;