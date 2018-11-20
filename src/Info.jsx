import React from 'react';

const Info = (props) => {
  const {Round, Black, White, Date, ECO, Result } = props.gameInfo || '';
  console.log(props)
  return(
    <div className="movelist">
      <div className="movesTitle">Game Information</div>
        <div className="gameInfo">
          <p>Event: World Championship</p>
          <p>Date: {Date}</p>
          <p>Round: {Round}</p>
          <p>White: {White}</p>
          <p>Black: {Black}</p>
          <p>ECO: {ECO}</p>
          <p>Result: {Result}</p>
      </div>
    </div>
  )
}

export default Info;
