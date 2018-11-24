import React from 'react';
import Player from './Player.jsx';

const Header = (props) => {
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
      <button className="nav-button" onClick={props.handleButton}>Game 1</button>
      <button className="nav-button" onClick={props.handleButton}>Game 2</button>
      <button className="nav-button" onClick={props.handleButton}>Game 3</button>
      <button className="nav-button" onClick={props.handleButton}>Game 4</button>
      <button className="nav-button" onClick={props.handleButton}>Game 5</button>
      <button className="nav-button" onClick={props.handleButton}>Game 6</button>
      <button className="nav-button" onClick={props.handleButton}>Game 7</button>
      <button className="nav-button" onClick={props.handleButton}>Game 8</button>
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
