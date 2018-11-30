import React from 'react';
import allGames from '../games/AllGames';

const  GameList = (props) => {
  const animationName = (props.isGameList) ? 'showGameMenu' : 'hideGameMenu';
  const createButtonList = (games) => {
    const buttons = games.map((_, i) => {
      return (
        <button key={i} className="nav-button" onClick={props.handleButton}>
          Game {i + 1}
        </button>
      )
    });
    return buttons;
  }
  return (
    <nav style={{animationName: `${animationName}`}}>
      {createButtonList(allGames)}
    </nav>
    )
  }

export default GameList;
