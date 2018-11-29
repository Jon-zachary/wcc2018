import React from 'react';

// TODO: add inc, dec, and move highlighting to variations
const Variation = (props) => {
  const { varMoves, start, isVarHidden } = props;
  const isHiddenClass = (isVarHidden) ? 'hide-InfoCard-info' : 'show-InfoCard-info' ;
  const hideShowButtonText = (isVarHidden) ? 'Show' : 'Hide';

  const animationStyle = {
    animationDurration: "1s",
    animationName: `${isHiddenClass}`,
  }

  const formatMoves = (mvs) => {
    const formattedMoves = []
    mvs.forEach((m, i) => {
      const halfMoveNum = i + start;
      let mvNum = ((halfMoveNum) % 2 === 0) ? `${(halfMoveNum / 2) + 1 }.` : null;
      if (halfMoveNum % 2 === 1 && i === 0) {
        mvNum = `${Math.ceil(i + start / 2)}. \u2026`;
      }
      formattedMoves.push(
        <span key={i}>
          {mvNum} {m}
          {(halfMoveNum % 2 === 1)? <br/> : ''}
        </span>
      )
    })
    return formattedMoves;
  }

  return (
    <div className="InfoCard">
      <div className="InfoCard-title">Variation</div>
      <div className="InfoCard-info"
        style={animationStyle}
        >{formatMoves(varMoves)}</div>
      <div className="InfoCard-button-wrapper">
      <button onClick={props.handleBack}>Back to mainline</button>
      <button onClick={props.hideFrame}>{hideShowButtonText}</button>
      </div>
    </div>
  )
}

export default Variation
