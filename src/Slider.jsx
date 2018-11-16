import React from 'react';

const Slider = (props) => {
  return (
    <div>
    <label className="depthLabel" htmlFor="depth">Depth</label>
    <br/>
    <input
      id="depth"
      type="range"
      name="depth"
      min={props.min}
      max={props.max}
      step={props.step}
      onChange={props.onChange}
      value={props.val}
      ></input>
      <p className="currentDepth">{props.val}</p>
      </div>
  )
}

export default Slider;
