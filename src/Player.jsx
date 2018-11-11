import React from 'react';

const Player = (props) => {
  const { src, name } = props;
  return (
    <div className="Player">
      <h2>{name}</h2>
      <img src={src} alt="name" style={{borderRadius: "20px", height: "293px"}} />
    </div>
  )
}

export default Player;
