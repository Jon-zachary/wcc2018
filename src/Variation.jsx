import React from 'react';

const Variation = (props) => {
  const { varMoves, start, isVarHidden } = props;
  const isHiddenClass = (isVarHidden) ? 'hideEval' : 'showEval' ;
  const hideShowButtonText = (isVarHidden) ? 'Show' : 'Hide';
  const formattedMoves = []
  function formatMoves(){
    varMoves.forEach((m, i) => {
      let halfMoveNum = i + start;
      // If halfMoveNum is even then declare moveNum var equal to halfMoveNum
      // Plus one, otherwise moveNum is null.
      let mvNum = ((halfMoveNum) % 2 === 0) ? `${(halfMoveNum / 2) + 1 }.` : null;

      // If the first halfmoves is odd then moveNum is equal to previous halfMoveNum
      // Plus the string '...'. This works but leaves out line break on first move
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
    console.log(formattedMoves);
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
