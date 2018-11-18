import React from 'react';

const MoveList = (props) => {
  const start = props.start || 0;
  const formattedMoves = []
    props.moves.forEach((m, i) => {
      if (i >= start) {
      let mvNum = (i % 2 === 0) ? `${(i / 2) + 1}.` : null;
      if (start % 2 === 1 && i === start) {
        mvNum = `${Math.ceil(i / 2)}. ...`;
      }
      formattedMoves.push(
        <span
          key={i}
          onClick={(evt) => props.handleMoveClick(evt,i + 1)}>
          {mvNum} {m}
          {(!mvNum) || (start % 2 === 1 && i === start) ? <br/> : ''}
        </span>
      )
    }
    })

  return(
    <div className="movelist">
      <div className="movesTitle">{props.title}</div>
      <div className="moves">
      <span>{formattedMoves}</span>
      <span>{props.getResult()}</span>
      </div>
    </div>
  )
}

export default MoveList;
