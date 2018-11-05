import React from 'react';

const TimeUnit = (props) => {
  return (
    <div className="TimeUnit">
      <span className="TimeNumber">{props.number}</span>
      <span className="TimeName">{props.unitName}</span>
    </div>
  )
}

export default TimeUnit;
