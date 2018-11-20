import React, { Component } from 'react';
import Slider from './Slider.jsx';
import MoveList from './MoveList.jsx'

class Eval extends Component {
  constructor(props) {
    super(props)
    this.state = {
      res: []
      }
      this.getEval = this.getEval.bind(this);
    }

    updateEval() {
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

    componentDidMount() {
      this.updateEval()
    }

   componentDidUpdate(prevProps) {
     if ((this.props.fen !== prevProps.fen) || (this.props.depth !== prevProps.depth)) {
       this.updateEval()
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
    const pv = [...this.props.moves.slice(0, this.props.currentMove),...pvArr.slice(pvIdx + 1, bmcIdx)];
    const pt = (arr.indexOf('w') > -1) ? 'White' : 'Black';
    return ({
      cp,
      best,
      pv,
      pt,
    })
  }

  render() {
  if(this.props.isEval){
  let {cp, best, pv, pt} = this.getEval(this.state.res);
  cp = (Number.isNaN(+cp)) ? 'thinking' : cp;
  console.log(pv);
  return(
    <div className="eval-container">
    <div className="movesTitle">Analysis info</div>
    <div className="evaluation">
    <div className="info">
    <Slider
      min={5}
      max={25}
      step={1}
      onChange={this.props.handleSlide}
      val={this.props.depth}
    />
  <p>score:{(cp / 100) || 'Thinking'}  </p>
  <meter
    title="centipawns"
    value={cp / 100}
    min= "-4"
    max= "4"
    optimum= "0"
    >
</meter>

      <p>Player to move: {pt}</p>
      <p>best move: {best}</p>
      <p>current Move: {Math.ceil(this.props.currentMove / 2)}</p>
    </div>
    <div className="pv">
      <h4>Computer Variation</h4>
      <MoveList
      moves={pv}
      getResult={()=> undefined}
      currentMove={this.props.currentMove}
      start={this.props.currentMove}
      showTitle={false}
      />
  </div>
  </div>
</div>
    )
  }
  return <div></div>
  }
}

export default Eval;
