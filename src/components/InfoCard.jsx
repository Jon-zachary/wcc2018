import React from 'react';

const InfoCard = (props) => {
  const {title, content, isHidden, buttonFunctions} = props;
  const hideShowButtonText = (isHidden) ? 'Show' : 'Hide';
  const isHiddenClass = (isHidden) ? 'hide-InfoCard-info' : 'show-InfoCard-info' ;

  const animationStyle = {
    "animationDurration": "1s",
    "animationName": `${isHiddenClass}`,
  }
  const buttons = () => {
    const names = Object.keys(buttonFunctions);
    const buttons = names.map(name => {
      const buttonText = (name === 'hide') ? hideShowButtonText : name;
      return <button key={name} onClick={buttonFunctions[name]}>{buttonText}</button>
    })
    return buttons;
  }

  return(
    <div className="InfoCard">
      <div className="InfoCard-title">{title}</div>
        <div className="InfoCard-info"
             style={animationStyle}
        >
          {content}
        </div>
      <div className = "InfoCard-button-wrapper">
        {buttons()}
      </div>
    </div>
  )
}

export default InfoCard;
