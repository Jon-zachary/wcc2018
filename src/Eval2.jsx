import React, { Component } from 'react';

class Eval2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      raw: '',
      cp: 0,
      nodes: 0,
      pv: '',
    }
  }

  updateEval = () => {
    const sf = window['stockfish'];
    sf.postMessage(`position fen ${this.props.fen}`)
    sf.postMessage(`go infinite`)
    sf.onmessage = (evt) => {
      const ev = evt.data
      const cp = (this.parseEval(ev).cp) ? this.parseEval(ev).cp[1] : this.state.cp;
      const nodes = (this.parseEval(ev).nodes) ? this.parseEval(ev).nodes[1] : this.state.nodes
      const pv = (this.parseEval(ev).pv) ? this.parseEval(ev).pv[0] : this.state.pv
      this.setState({
        raw: ev,
        cp,
        nodes,
        pv,
      })
    }
  }

  stopSf = () => {
    const sf = window['stockfish'];
    sf.postMessage('quit');
  }


  startSf = () => {
    this.updateEval();
  }

  parseEval = (str) => {
    //regex for centipawn score
    const cpRE =  /cp (\d+)/;

    //regex for nodes Searched
    const nodesRE = /nodes (\d+)/
    const nodes = str.match(nodesRE);

    //regex for pv
    const pvRE = /(?<=pvSan).*?(?=bmc)/
    const pv = str.match(pvRE);

    return {
      cp: str.match(cpRE),
      nodes,
      pv,
    }
}
  render() {
    return(
    <div className="Eval2">
      <div className="movesTitle">Engine Evaluation</div>
      <div className="eval2Info">
        <p>Best move: {this.state.pv.split(' ')[1]}</p>
        <p>Score: {this.state.cp}</p>
        <p>Nodes Searched: {this.state.nodes}</p>
        <div>Computer Variation: {this.state.pv}</div>
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
