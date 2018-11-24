import React from 'react';

const Variation = (props) => {
  const { varMoves, start } = props;
  const formattedMoves = []
  function formatMoves(){
    varMoves.forEach((m, i) => {
      let mvNum = ((i + start) % 2 === 0) ? `${Math.floor((i + start / 2))}.` : null;
      if (i === 0 && start % 2 === 1) {
        mvNum = `${Math.ceil(i + start/ 2)}. ...`;
      }
      formattedMoves.push(
        <span key={i}>
          {mvNum} {m}
          {(!mvNum) || (start % 2 === 1 && i === start) ? <br/> : ''}
        </span>
      )
    })
    return [formattedMoves];
  }
  return (
    <div className="Eval2">
      <div className="movesTitle">Variation</div>
      <div className="eval2Info">{formatMoves()}</div>
    </div>
  )
}

export default Variation
