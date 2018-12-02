import React from 'react';
import Player from './Player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimes} from '@fortawesome/free-solid-svg-icons'
// TODO: minimize when game is selected.
const Header = (props) => {
  const icon = (props.isGameList) ? faTimes : faBars;
  return (
  <div className="Header">
    <FontAwesomeIcon
      icon={icon}
      size={"3x"}
      onClick={props.handleMenuClick}
      />
    <Player
      src="https://xpertchesslessons.files.wordpress.com/2017/12/carlsenmagnus_winnergct2017_319.png"
      name="Magnus Carlsen"
      />
    <div className="Title">
      <p>World Chess Championship 2018</p>
      <p>Caruana Vs. Carlsen</p>
    </div>
    <Player
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Fabiano_Caruana_2013%282%29.jpg/220px-Fabiano_Caruana_2013%282%29.jpg"
      name="Fabiano Caruana"
      />
  </div>
  )
}

export default Header;
