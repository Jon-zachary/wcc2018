import React from 'react';

const GameHeader = (props) => {
  const {Round, Black, White} = props.gameInfo || 'Loading';
  return(
    <div className={"GameHeader"}>
    <h2>{White} Vs. {Black}</h2>
    <h2 style={{"textAlign": "center"}}>Round - {Round}</h2>
    </div>
  )
}

export default GameHeader;
