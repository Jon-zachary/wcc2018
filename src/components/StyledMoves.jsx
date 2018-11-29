import React from 'react';

const StyledMoves = (props) => {
    const {mainMoves, varMoves, currentMove: start} = props;
    const formattedMoves = [] // for results
    // If in variation use those moves, otherwise use main. Eval count as variations?
    const moves = (varMoves.length > 0) ? varMoves : mainMoves;

    moves.forEach((m, i) => {
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
        <span key={i}>
          {mvNum} {m}
          {(halfMoveNum % 2 === 1) ? <br/> : ''}
        </span>
      )
    })
    return formattedMoves;
}

export default StyledMoves;

// From Eval
// const formattedMoves = []
// let active = 'highlight';
//   moves.forEach((m, i) => {
//     let mvNum = ((start + i + 1) % 2 === 1) ? `${Math.ceil((start + i + 1) / 2)}.` : '';
//     if (i === 0 && start % 2 === 1) mvNum = `${Math.ceil((start + i + 1) / 2)}...`;
//     formattedMoves.push(
//       <span
//         key={i + start}
//         className={(this.props.currentMove === i + 1 + start) ? active : undefined}
//         onClick={(evt) => this.props.handleMoveClick(evt,i + 1 + start)}>
//         {mvNum} {m} {' '}
//       </span>
//     )
//   })
//   return formattedMoves;
// }


// From MoveList
// const formatMoves = () => {
// const formattedMoves = []
// moves.forEach((m, i) => {
//   const active  = (currentMove === i + 1) ? 'highlight' : undefined;
//   if (i >= start) {
//   let mvNum = (i % 2 === 0) ? `${(i / 2) + 1}.` : null;
//   if (start % 2 === 1 && i === start) {
//     mvNum = `${Math.ceil(i / 2)}. ...`;
//   }
//   formattedMoves.push(
//     <span
//       key={i}
//       onClick={(evt) => props.handleMoveClick(evt,i + 1)}
//       >
//       {mvNum} <button className={`link-button ${active}`}>{m}</button>
//       {(!mvNum) || (start % 2 === 1 && i === start) ? <br/> : ''}
//     </span>
//     );
//   }
// });
// return formattedMoves;
// }

//From Variation
// const formatMoves = () => {
//   const formattedMoves = []
//   varMoves.forEach((m, i) => {
//     const halfMoveNum = i + start;
//     let mvNum = ((halfMoveNum) % 2 === 0) ? `${(halfMoveNum / 2) + 1 }.` : null;
//     if (halfMoveNum % 2 === 1 && i === 0) {
//       mvNum = `${Math.ceil(i + start / 2)}. \u2026`;
//     }
//     formattedMoves.push(
//       <span key={i}>
//         {mvNum} {m}
//         {(!mvNum) || (halfMoveNum % 2 === 1 && i === 0)? <br/> : ''}
//       </span>
//     )
//   })
//   return formattedMoves;
// }

//Some basic structure - function sig: arg:Array-of-chess-moves,
// Return: Array-of-spans. There are two cases, you are either starting from move
// zero or you are starting from some move greater than zero. Maybe make that an
// arg? sure. The only one that's not returning moves as columns is Eval. Also
// in an ideal world all the moves would be clickable show the correct position
// as well as have a back to main button.
