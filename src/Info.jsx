import React from 'react';

const Info = (props) => {
  const {Round, Black, White, Date, ECO, Result } = props.gameInfo || '';
  const isInfoHidden = props.isInfoHidden;
  const isHiddenClass = (isInfoHidden) ? 'hideEval' : 'showEval' ;
  const hideShowButtonText = (isInfoHidden) ? 'Show' : 'Hide';
  return(
    <div className="movelist">
      <div className="movesTitle">Game Information</div>
        <div className="gameInfo"
          style={{
          "animationDurration": "1s",
          "animationName": `${isHiddenClass}`,
          }}>
          <p>Event: World Championship</p>
          <p>Date: {Date}</p>
          <p>Round: {Round}</p>
          <p>White: {White}</p>
          <p>Black: {Black}</p>
          <p>ECO: {ECO}</p>
          <p>Result: {Result}</p>
      </div>
      <div className = "eval-button-wrapper">
        <button onClick={props.hideInfoFrame}>{hideShowButtonText}</button>
      </div>
    </div>
  )
}

export default Info;
