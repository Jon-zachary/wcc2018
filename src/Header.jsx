import React from 'react';

const Header = (props) => {
  return (
  <div>
    <h1 className="Title">WCC 2018 Caruana Vs. Carlsen</h1>
    <div className="Fabi">
    <h2>Fabiano Caruana</h2>
    <img className="Avi" src="https://www.dw.com/image/43160634_303.jpg" alt="Fabiano" />
    </div>
    <div className="Magnus">
    <h2>Magnus Carlsen</h2>
    <img className="Avi" src="https://blog.playmagnus.com/content/images/2018/09/6.jpg" alt="Magnus" />
    </div>
  </div>
  )
}

export default Header;
