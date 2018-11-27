import React from 'react';

// TODO: add inc, dec, and move highlighting to variations
const Variation = (props) => {
  const { varMoves, start, isVarHidden } = props;
  const isHiddenClass = (isVarHidden) ? 'hideEval' : 'showEval' ;
  const hideShowButtonText = (isVarHidden) ? 'Show' : 'Hide';
  const formattedMoves = []
  function formatMoves(){
    varMoves.forEach((m, i) => {
      const halfMoveNum = i + start;
      let mvNum = ((halfMoveNum) % 2 === 0) ? `${(halfMoveNum / 2) + 1 }.` : null;
      if (halfMoveNum % 2 === 1 && i === 0) {
        mvNum = `${Math.ceil(i + start / 2)}. \u2026`;
      }
      formattedMoves.push(
        <span key={i}>
          {mvNum} {m}
          {(!mvNum) || (halfMoveNum % 2 === 1 && i === 0)? <br/> : ''}
        </span>
      )
    })
    return formattedMoves;
  }
  return (
    <div className="Eval2">
      <div className="movesTitle">Variation</div>
      <div className="eval2Info"
        style={{
        "animationDurration": "1s",
        "animationName": `${isHiddenClass}`,
        }}
        >{formatMoves()}</div>
      <div className="eval-button-wrapper">
      <button onClick={props.handleBack}>Back to mainline</button>
      <button onClick={props.hideFrame}>{hideShowButtonText}</button>
      </div>
    </div>
  )
}

export default Variation
