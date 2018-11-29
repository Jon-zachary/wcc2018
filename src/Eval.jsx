import React, { Component } from 'react';
class Eval extends Component {
  constructor(props) {
    super(props)
    this.state = {
      raw: '',
      cp: 0,
      pv: '',
      bestMove: '',
      isStopped: false,
      isHidden: false,
      sf: window['stockfish']
    }
  }

  updateEval = () => {
    const sf = this.state.sf;
    sf.postMessage('setoption name clear hash')
    sf.postMessage(`position fen ${this.props.fen}`)
    sf.postMessage(`go movetime 20000`)
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

  resetEval = () => {
    this.setState({
      cp:0,
      nodes:'Calculating',
      pv:'Calculating'
    })
  }

  componentDidUpdate(prevProps) {
    if ((this.props.fen !== prevProps.fen) || (this.props.depth !== prevProps.depth)) {
      this.resetEval();
      this.updateEval();
    }
  }

  parseMovesVerbose = () => {
    const movesV = this.state.movesVerbose.map(mv => {
      return mv.from+mv.to;
    });
    return movesV;
  }

  formatMoves = (moves) => {
    const varLength = this.props.varMoves.length;
    const start = this.props.currentMove + varLength;
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
    const sf = this.state.sf;
    sf.postMessage('stop');
  }

  startSf = () => {
    this.updateEval();
  }

  hideEvalFrame = () => {
    this.setState((prevState) => {
      return {
      isHidden: !prevState.isHidden
      }
    })
  }

  parseEval = (str='') => {
    //regex for centipawn score
    const cpRE =  /cp (\d+)/;
    const cpM = str.match(cpRE);
    const cp = (cpM) ? cpM[1] : this.state.cp;

    //regex for pv
    const pvRE = /(?<=pvSan).*?(?=bmc)/
    const pvM = str.match(pvRE);
    const pv = (pvM && pvM[0] !== this.state.pv) ? pvM[0] : this.state.pv;

    return {
      cp,
      pv,
    }
}

  render() {
    const rawMoves = this.state.pv;
    const movesArr = rawMoves.split(' ')
    const isHiddenClass = (this.state.isHidden) ? 'hideEval' : 'showEval' ;
    const hideShowButtonText = (this.state.isHidden) ? 'Show' : 'Hide';

    const evalInfoStyle = {
      animationDurration: "1s",
      animationName: `${isHiddenClass}`,
    }

    movesArr.pop();
    movesArr.shift();
    const moves = this.formatMoves(movesArr);
    return(
    <div className="Eval">
      <div className="movesTitle">Engine Evaluation</div>
      <div className="EvalInfo"
         style={evalInfoStyle}>
        <p>Best move: {this.state.pv.split(' ')[1]}</p>
          <span>score:{(this.state.cp / 100) || 'Calculating'}</span>
          <meter
            title="centipawns"
            value={(this.state.cp) ? this.state.cp / 100 : 0}
            min= "-4"
            max= "4"
            optimum= "0"
            >
        </meter>
        <div className="pv">Computer Variation: {moves}</div>
      </div>
      <div className={"InfoCard-button-wrapper"}>
      <button onClick={this.hideEvalFrame}> {hideShowButtonText } </button>
      </div>
    </div>
    )
  }
}

export default Eval;
