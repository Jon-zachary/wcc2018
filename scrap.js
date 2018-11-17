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

<div className="movelist">
  {this.state.moves.map((move, i , self) => {
    const white = i + 1;
    const black = i + 2;
    const mvNum = Math.floor(i / 2) + 1
    if(i % 2 === 0) {
    return (
      <span key={i}>
        <span>{mvNum}: </span><span className="link-button" onClick={(evt) => this.handleMoveClick(evt,white)}>{move}</span>
        <span>&nbsp;&nbsp;</span>
        <span className="link-button" onClick={(evt) => this.handleMoveClick(evt,black)}>{self[i + 1]}</span>
      </span>
      )
    }
    return undefined;
  })}
  <span>{this.getResult()}</span>
</div>
