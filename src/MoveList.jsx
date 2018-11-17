import React from 'react';

const MoveList = (props) => {
  return(
    <div className="movelist">
      {props.moves.map((move, i , self) => {
        const white = i + 1;
        const black = i + 2;
        const mvNum = Math.floor(i / 2) + 1
        const active = 'highlight'
        if(i % 2 === 0) {
        return (
          <span key={i}>
            <span>{mvNum}: </span><span className={`${(props.currentMove === white) && active} link-button`} onClick={(evt) => props.handleMoveClick(evt,white)}>{move}</span>
            <span>&nbsp;&nbsp;</span>
            <span className={`${(props.currentMove === black) && active} link-button`} onClick={(evt) => props.handleMoveClick(evt,black)}>{self[i + 1]}</span>
          </span>
          )
        }
        return undefined;
      })}
      <span>{props.getResult()}</span>
    </div>
  )
}

export default MoveList;
