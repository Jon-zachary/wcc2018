import React from 'react';
import Player from './Player.jsx';

const Header = (props) => {
  return (
  <div className="Header">
    <Player
      src="https://xpertchesslessons.files.wordpress.com/2017/12/carlsenmagnus_winnergct2017_319.png"
      name="Magnus Carlsen"
      />
    <h1 className="Title">World Chess Championship 2018
                           Caruana Vs. Carlsen</h1>
    <Player
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Fabiano_Caruana_2013%282%29.jpg/220px-Fabiano_Caruana_2013%282%29.jpg"
      name="Fabiano Caruana"
      />
  </div>
  )
}

export default Header;
