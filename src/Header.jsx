import React from 'react';
import Player from './Player.jsx';
import allGames from './games/AllGames.jsx';

const Header = (props) => {
  const createButtonList = (games) => {
    const buttons = games.map((_, i) => {
      return (
        <button className="nav-button" onClick={props.handleButton}>
          Game {i + 1}
        </button>
      )
    });
    return buttons;
  }
  return (
  <div className="Header">
    <Player
      src="https://xpertchesslessons.files.wordpress.com/2017/12/carlsenmagnus_winnergct2017_319.png"
      name="Magnus Carlsen"
      />
    <div className="Title">
      <p>World Chess Championship 2018</p>
      <p>Caruana Vs. Carlsen</p>
      <nav>
      {createButtonList(allGames)}
      </nav>
    </div>
    <Player
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Fabiano_Caruana_2013%282%29.jpg/220px-Fabiano_Caruana_2013%282%29.jpg"
      name="Fabiano Caruana"
      />
  </div>
  )
}

export default Header;
