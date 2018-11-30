import React from 'react';

const Info = (props) => {
  // Have to keep cond. because props are from function that won't run until
  // parent is mounted. Maybe can fix in parent.
  const {Round, Black, White, Date, ECO, Result } = props.gameInfo || '';
  return(
          <>
          <p>Event: World Championship</p>
          <p>Date: {Date}</p>
          <p>Round: {Round}</p>
          <p>White: {White}</p>
          <p>Black: {Black}</p>
          <p>ECO: {ECO}</p>
          <p>Result: {Result}</p>
          </>
  )
}

export default Info;
