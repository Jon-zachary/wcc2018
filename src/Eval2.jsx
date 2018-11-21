import React, { Component } from 'react';

class Eval2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      raw: '',
      cp: 0,
      nodes: 0,
      pv: '',
      bestMove: '',
      isStopped: false,
    }
  }

  updateEval = () => {
    const sf = window['stockfish'];
    sf.postMessage(`position fen ${this.props.fen}`)
    // sf.postMessage('setoption name Hash value 2048')
    sf.postMessage(`go infinite`)
    sf.onmessage = (evt) => {
      const ev = evt.data;
      const cp = (this.parseEval(ev).cp) || this.state.cp;
      const nodes = (this.parseEval(ev).nodes) ? this.parseEval(ev).nodes : this.state.nodes
      const pv = (this.parseEval(ev).pv) ? this.parseEval(ev).pv : this.state.pv
      this.setState({
        raw: ev,
        cp,
        nodes,
        pv,
      })
    }
  }

  componentDidUpdate(prevProps) {
    if ((this.props.fen !== prevProps.fen) || (this.props.depth !== prevProps.depth)) {
      this.updateEval()
    }
  }

  formatMoves = (moves) => {
    const start = this.props.currentMove;
    const formattedMoves = []
    let active = 'highlight';
      moves.forEach((m, i) => {
        let mvNum = ((start + i + 1) % 2 === 1) ? `${Math.ceil((start + i + 1) / 2)}.` : '';
        if (i === 0 && start % 2 === 1) mvNum = `${Math.ceil((start + i + 1) / 2)}...`;
        formattedMoves.push(
          <span
            key={i + start}
            className={(this.props.currentMove === i + 1 + start) ? active : undefined}
            onClick={(evt) => this.props.handleMoveClick(evt,i + 1 + start)}>
            {mvNum} {m} {' '}
          </span>
        )
      })
      return formattedMoves;
    }

  stopSf = () => {
    const sf = window['stockfish'];
    sf.postMessage('stop');
  }

  startSf = () => {
    this.updateEval();
  }

  parseEval = (str='') => {
    //regex for centipawn score
    const cpRE =  /cp (\d+)/;
    const cpM = str.match(cpRE);
    const cp = (cpM) ? cpM[1] : this.state.cp;

    //regex for nodes Searched
    const nodesRE = /nodes (\d+)/
    const nodesM = str.match(nodesRE);
    const nodes = (nodesM) ? nodesM[1] : this.state.nodes;

    //regex for pv
    const pvRE = /(?<=pvSan).*?(?=bmc)/
    const pvM = str.match(pvRE);
    const pv = (pvM) ? pvM[0] : this.state.pv;

    return {
      cp,
      nodes,
      pv,
    }
}
  render() {
    const rawMoves = this.state.pv;
    const movesArr = rawMoves.split(' ')
    movesArr.pop();
    movesArr.shift();
    const moves = this.formatMoves(movesArr);
    return(
    <div className="Eval2">
      <div className="movesTitle">Engine Evaluation</div>
      <div className="eval2Info">
        <p>Best move: {this.state.pv.split(' ')[1]}</p>
          <span>score:{(this.state.cp / 100) || 'Thinking'}</span>
          <meter
            title="centipawns"
            value={this.state.cp / 100}
            min= "-4"
            max= "4"
            optimum= "0"
            >
        </meter>
        <p>Nodes Searched: {this.state.nodes}</p>
        <div>Computer Variation: {moves}</div>
      </div>
      <div className={"eval-button-wrapper"}>
      <button onClick={this.startSf}>Start</button>
      <button onClick={this.stopSf}>Stop</button>
      </div>
    </div>
    )
  }
}

export default Eval2;
