import React from 'react';

const Player = (props) => {
  const { src, name } = props;
  return (
    <div className="Player">
      <h2 className="Player-name">{name}</h2>
      <img src={src} alt="name" style={{borderRadius: "100px", height: "75%", width: "100px"}} />
    </div>
  )
}

export default Player;
