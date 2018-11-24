// Get future and current date in ms
// Subtract current from future
// reformat milliseconds into Days: Hours: Minutes: seconds

const future = new Date('November 9, 2018 15:00:00 GMT+0:00')
const now = new Date();
const time = future - now;


function msToDate(ms) {
  let seconds = ms / 1000;
  let minutes = seconds / 60;
  let hours = minutes / 60;
  let days = hours / 24;

  seconds = Math.floor(seconds % 60);
  minutes = Math.floor(minutes % 60);
  hours = Math.floor(hours % 24);
  days = Math.floor(days);

  return { days, hours, minutes, seconds }

}


console.log(msToDate(time));

// {props.moves.map((move, i , self) => {
//   const white = i + 1;
//   const black = i + 2;
//   const mvNum = Math.floor(i / 2) + 1
//   const active = 'highlight'
//   return (
//     <span className="singleMove" key={i}>
//       <span>{mvNum}: </span>
//       <span className={`${(props.currentMove === white) && active} link-button`} onClick={(evt) => props.handleMoveClick(evt,white)}>{move} </span>
//       <span className={`${(props.currentMove === black) && active} link-button`} onClick={(evt) => props.handleMoveClick(evt,black)}> {self[i + 1]}</span>
//     </span>
//     )
// })}

// <Slider
//   min={5}
//   max={25}
//   step={1}
//   onChange={this.handleSlide}
//   val={this.state.evalDepth}
//   />

/* .CountDown-container {
  display: flex;
  justify-content: space-between;
  font-family: Dosis, sans-serif;
  font-size: 55px;
  color: white;
  background-color: black;
}

.TimeUnit {
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.TimeName {
  font-size: 20px;
  color: #5e5e5e;
  font-weight: bolder;
} */

// style={{"backgroundColor": `${isHiddenColorClass}`}}
