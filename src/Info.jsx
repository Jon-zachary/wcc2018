import React from 'react';

const Info = (props) => {
  // Have to keep cond. because props are from function that won't run until
  // parent is mounted. Maybe can fix in parent.
  const {Round, Black, White, Date, ECO, Result } = props.gameInfo || '';
  const {isInfoHidden, hideInfoFrame} = props
  const isHiddenClass = (isInfoHidden) ? 'hide-InfoCard-info' : 'show-InfoCard-info' ;
  const hideShowButtonText = (isInfoHidden) ? 'Show' : 'Hide';
  const animationStyle = {
    animationDurration: "1s",
    animationName: `${isHiddenClass}`,
  }
  return(
    <div className="InfoCard">
      <div className="InfoCard-title">Game Information</div>
        <div className="InfoCard-info"
          style={animationStyle}>
          <p>Event: World Championship</p>
          <p>Date: {Date}</p>
          <p>Round: {Round}</p>
          <p>White: {White}</p>
          <p>Black: {Black}</p>
          <p>ECO: {ECO}</p>
          <p>Result: {Result}</p>
      </div>
      <div className = "InfoCard-button-wrapper">
        <button onClick={hideInfoFrame}>{hideShowButtonText}</button>
      </div>
    </div>
  )
}

export default Info;
