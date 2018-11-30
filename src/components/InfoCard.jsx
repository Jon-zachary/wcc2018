import React from 'react';

const InfoCard = (props) => {
  const {title, content, isHidden, buttonFunctions} = props;
  const hideShowButtonText = (isHidden) ? 'Show' : 'Hide';
  const isHiddenClass = (isHidden) ? 'hide-InfoCard-info' : 'show-InfoCard-info' ;

  const animationStyle = {
    "animationDurration": "1s",
    "animationName": `${isHiddenClass}`,
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
        <button onClick={buttonFunctions.hideInfoFrame}>{hideShowButtonText}</button>
      </div>
    </div>
  )
}

export default InfoCard;
