import React from 'react';

const Player = (props) => {
  const { src, name } = props;
  return (
    <div className="Player">
      <h2 className="Player-Title">{name}</h2>
      <img src={src} alt="name" style={{borderRadius: "20px", height: "200px", width: "150px"}} />
    </div>
  )
}

export default Player;
