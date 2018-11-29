import React from 'react';
import StyledMoves from './StyledMoves';

// TODO: add inc, dec, and move highlighting to variations
const Variation = (props) => {
  const { varMoves, start, isVarHidden } = props;
  const isHiddenClass = (isVarHidden) ? 'hide-InfoCard-info' : 'show-InfoCard-info' ;
  const hideShowButtonText = (isVarHidden) ? 'Show' : 'Hide';

  const animationStyle = {
    animationDurration: "1s",
    animationName: `${isHiddenClass}`,
  }


  return (
    <div className="InfoCard">
      <div className="InfoCard-title">Variation</div>
      <div className="InfoCard-info"
        style={animationStyle}
        >
      <StyledMoves
        
        varMoves={varMoves}
        currentMove={start}
        />
      </div>
      <div className="InfoCard-button-wrapper">
      <button onClick={props.handleBack}>Back to mainline</button>
      <button onClick={props.hideFrame}>{hideShowButtonText}</button>
      </div>
    </div>
  )
}

export default Variation
