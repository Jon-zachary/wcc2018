import React from 'react';
import Player from './Player.jsx';

const Header = (props) => {
  return (
    <>
  <h1 className="Title">WCC 2018 Caruana Vs. Carlsen</h1>
  <div className="Player-wrapper">
    <Player
      src="https://i.guim.co.uk/img/media/8b41df4f2386812fc1229bdd21a22c667d2bec4a/0_50_3500_2100/master/3500.jpg?width=300&quality=85&auto=format&fit=max&s=f7f004c61e88b5fc5816d41d4ef62f0d"
      name="Magnus Carlsen"
      />
    <Player
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Fabiano_Caruana_4%2C_Candidates_Tournament_2018.jpg/220px-Fabiano_Caruana_4%2C_Candidates_Tournament_2018.jpg"
      name="Fabiano Caruana"
      />
  </div>
  </>
  )
}

export default Header;
