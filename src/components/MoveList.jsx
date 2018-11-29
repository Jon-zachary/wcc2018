import React from 'react';
import StyledMoves from './StyledMoves';

const MoveList = (props) => {

  const {start, gameInfo, isMovHidden, currentMove, hideMovFrame, moves} = props;
  const result = (gameInfo) ? gameInfo.Result : '';
  const isHiddenClass = (isMovHidden) ? 'hide-InfoCard-info' : 'show-InfoCard-info' ;
  const hideShowButtonText = (isMovHidden) ? 'Show' : 'Hide';

  const animationStyle = {
    "animationDurration": "1s",
    "animationName": `${isHiddenClass}`,
  }

  return(
    <div className="InfoCard">
      <div className="InfoCard-title">{props.title}</div>
      <div className="InfoCard-info"
        style={animationStyle}>
      <span>
        <StyledMoves
          varMoves={[]}
          mainMoves={moves}
          currentMove={currentMove}
          handleMoveClick={props.handleMoveClick}
          />
         {result}
       </span>
      </div>
      <div className = "InfoCard-button-wrapper">
        <button onClick={hideMovFrame}>{hideShowButtonText}</button>
      </div>
    </div>
  )
}

export default MoveList;
