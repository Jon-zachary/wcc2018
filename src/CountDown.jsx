import React, { Component } from 'react';
import TimeUnit from './TimeUnit.jsx';

class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date('November 9, 2018 15:00:00 GMT+0:00'),
      now: new Date(),
    }
    this.msToDate = this.msToDate.bind(this);
  }

  // Convert milliseconds to days,hours,minutes,seconds
  msToDate(ms) {
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

  formatNumber(n) {
    if (n < 10) {
      n = 0 + (n).toString();
    } else n = (n).toString();
    return(n);
  }

  formatTime() {
    const diff = this.state.startDate - this.state.now;
    const time = this.msToDate(diff);
    for(let k in time) {
      time[k] = this.formatNumber(time[k]);
    }
    let { days, hours, minutes, seconds } = time;
    const hasStarted = (diff < 0);
    const timer = <div className="CountDown-container">
      <TimeUnit number={days} unitName="days" />
      <span> : </span>
      <TimeUnit number={hours} unitName="hours" />
      <span> : </span>
      <TimeUnit number={minutes} unitName="minutes" />
      <span> : </span>
      <TimeUnit number={seconds} unitName="seconds" />
    </div>
    const started = <p> It's happening </p>
    return(
      hasStarted ? started : timer
    )
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      now: new Date(),
    });
  }

  render() {
    return(
      <div>
      {this.formatTime()}
      </div>
    )
  }

}


export default CountDown;
