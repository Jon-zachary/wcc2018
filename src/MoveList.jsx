import React from 'react';

const MoveList = (props) => {

  const {start, gameInfo, isMovHidden, currentMove, hideMovFrame, moves} = props;
  const result = (gameInfo) ? gameInfo.Result : '';
  const isHiddenClass = (isMovHidden) ? 'hideMoveList' : 'showMoveList' ;
  const hideShowButtonText = (isMovHidden) ? 'Show' : 'Hide';

  const movesStyle = {
    "animationDurration": "1s",
    "animationName": `${isHiddenClass}`,
  }

  const formatMoves = () => {
  const formattedMoves = []
  moves.forEach((m, i) => {
    const active  = (currentMove === i + 1) ? 'highlight' : undefined;
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
      );
    }
  });
  return formattedMoves;
}

  return(
    <div className="movelist">
      <div className="movesTitle">{props.title}</div>
      <div className="moves"
        style={movesStyle}>
      <span>{formatMoves()} {result}</span>
      </div>
      <div className = "InfoCard-button-wrapper">
        <button onClick={hideMovFrame}>{hideShowButtonText}</button>
      </div>
    </div>
  )
}

export default MoveList;
