import React from 'react';
import StyledMoves from './StyledMoves';

// TODO: add inc, dec, and move highlighting to variations
const Variation = (props) => {
  const { varMoves, start} = props;
  return (
      <StyledMoves
        varMoves={varMoves}
        currentMove={start}
        />
  )
}

export default Variation
