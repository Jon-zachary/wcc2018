import React from 'react';

const Info = (props) => {
  // Have to keep cond. because props are from function that won't run until
  // parent is mounted. Maybe can fix in parent.
  const {Round, Black, White, Date, ECO, Result } = props.gameInfo || '';
  const {isInfoHidden, hideInfoFrame} = props
  const isHiddenClass = (isInfoHidden) ? 'hideEval' : 'showEval' ;
  const hideShowButtonText = (isInfoHidden) ? 'Show' : 'Hide';
  const gameInfoStyle = {
    animationDurration: "1s",
    animationName: `${isHiddenClass}`,
  }
  return(
    <div className="movelist">
      <div className="movesTitle">Game Information</div>
        <div className="gameInfo"
          style={gameInfoStyle}>
          <p>Event: World Championship</p>
          <p>Date: {Date}</p>
          <p>Round: {Round}</p>
          <p>White: {White}</p>
          <p>Black: {Black}</p>
          <p>ECO: {ECO}</p>
          <p>Result: {Result}</p>
      </div>
      <div className = "eval-button-wrapper">
        <button onClick={hideInfoFrame}>{hideShowButtonText}</button>
      </div>
    </div>
  )
}

export default Info;
