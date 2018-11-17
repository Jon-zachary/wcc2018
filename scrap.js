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
