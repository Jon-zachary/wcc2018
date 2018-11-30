import React from 'react';

const StyledMoves = (props) => {
    let {mainMoves, varMoves, currentMove: start} = props;
    let currentMove = start;
    const handleMoveClick = (props.handleMoveClick) ? props.handleMoveClick : () => '';
    const formattedMoves = []
    let moves=[];
    if (mainMoves) {
      moves = mainMoves;
      start = 0;
    }
    // If in variation use those moves, otherwise use main. Eval count as variations?
    if (varMoves.length > 0) moves = varMoves;

    moves.forEach((m, i) => {
      const active  = (currentMove === i + 1) ? 'highlight' : undefined;
      // sets the current half move, if start is 0 then regular move list
      const halfMoveNum = i + start;
      // converts half moves to full moves. groups by 2, so if it's an even
      // number of half moves the whole move number goes up by 1 otherwise null
      // add 1 so no move zero.
      let mvNum = ((halfMoveNum) % 2 === 0) ? `${(halfMoveNum / 2) + 1 }.` : null;
      // if moves start from an odd first half move then need to display the
      // previous half move with ellipsis and then the move to indicate white
      // has moved and we are seeing blacks move.
      if (halfMoveNum % 2 === 1 && i === 0) {
        mvNum = `${Math.ceil(i + start / 2)}. \u2026`;
      }
      // now we put the current full move if it exists and half move into a span
      // and push it into our results array. If the half move is odd then start
      // a new line.
      formattedMoves.push(
        <span key={i}
        onClick={(evt) => handleMoveClick(evt,i + 1)}
        >
          {mvNum} <button className={`link-button ${active}`}>{m}</button>
          {(halfMoveNum % 2 === 1) ? <br/> : ''}
        </span>
      )
    })
    return formattedMoves;
}

export default StyledMoves;
