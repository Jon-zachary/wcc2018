import React, { Component } from 'react';

class Eval extends Component {
  constructor(props) {
    super(props)
    this.state = {
      res: []
      }
      this.getEval = this.getEval.bind(this);
    }

    componentDidMount(props) {
      const sf = window['stockfish'];
      sf.postMessage(`position fen ${this.props.fen}`)
      sf.postMessage(`go depth ${this.props.depth}`)
      sf.onmessage = (evt) => {
        const ev = evt.data ? evt.data : evt;
        this.setState({
          res: [...this.state.res,...[ev]]
        })
      }
    }

   componentDidUpdate(prevProps) {
     if ((this.props.fen !== prevProps.fen) || (this.props.depth !== prevProps.depth)) {
       const sf = window['stockfish'];
       sf.postMessage(`position fen ${this.props.fen}`)
       sf.postMessage(`go depth ${this.props.depth}`)
       sf.onmessage = (evt) => {
         const ev = evt.data ? evt.data : evt;
         this.setState({
           res: [...this.state.res,...[ev]]
         })
       }
     }
   }

  getEval(ev) {
    const arr = ev[ev.length - 1].split(' ');
    const pvArr = ev[ev.length - 2].split(' ');
    const cpIdx = arr.indexOf('cp');
    const cp = arr[cpIdx + 1];
    const bestIdx = arr.indexOf('bestmoveSan');
    const best = (arr[bestIdx + 1] === 'info') ? 'thinking' : arr[bestIdx + 1];
    const pvIdx = pvArr.indexOf('pvSan');
    const bmcIdx = pvArr.indexOf('bmc');
    const pv = pvArr.slice(pvIdx + 1, bmcIdx);
    return ({
      cp,
      best,
      pv,
    })
  }

  render() {
  if(this.props.isEval){
  const {cp, best, pv} = this.getEval(this.state.res);
  return(
    <div className="evaluation">
      <p>score: {cp}</p>
      <p>best move: {best}</p>
      <div>probable variation: {pv}</div>
    </div>
    )
  }
  return <div></div>
  }
}

export default Eval;
