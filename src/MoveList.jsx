import React from 'react';

const MoveList = (props) => {
  const start = props.start || 0;
  const result = (props.gameInfo) ? props.gameInfo.Result : '';
  const isMovHidden = props.isMovHidden;
  const isHiddenClass = (isMovHidden) ? 'hideMoveList' : 'showMoveList' ;
  const hideShowButtonText = (isMovHidden) ? 'Show' : 'Hide';
  const formattedMoves = []
    props.moves.forEach((m, i) => {
      const active  = (props.currentMove === i + 1) ? 'highlight' : undefined;
      if (i >= start) {
      let mvNum = (i % 2 === 0) ? `${(i / 2) + 1}.` : null;
      if (start % 2 === 1 && i === start) {
        mvNum = `${Math.ceil(i / 2)}. ...`;
      }
      formattedMoves.push(
        <span
          key={i}
          onClick={(evt) => props.handleMoveClick(evt,i + 1)}
          >
          {mvNum} <button className={`link-button ${active}`}>{m}</button>
          {(!mvNum) || (start % 2 === 1 && i === start) ? <br/> : ''}
        </span>
      )
    }
    })

  return(
    <div className="movelist">
      <div className="movesTitle">{props.title}</div>
      <div className="moves"
        style={{
        "animationDurration": "1s",
        "animationName": `${isHiddenClass}`,
        }}>
      <span>{formattedMoves} {result}</span>
      </div>
      <div className = "eval-button-wrapper">
        <button onClick={props.hideMovFrame}>{hideShowButtonText}</button>
      </div>
    </div>
  )
}

export default MoveList;
