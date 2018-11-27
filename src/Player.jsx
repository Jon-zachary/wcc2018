import React from 'react';

const Player = (props) => {
  const { src, name } = props;
  return (
    <div className="Player">
      <h2 className="Player-Title">{name}</h2>
      <img src={src} alt="name" style={{borderRadius: "100px", height: "100px", width: "100px"}} />
    </div>
  )
}

export default Player;
