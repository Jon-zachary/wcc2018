import React, { Component } from 'react';
import StyledMoves from './StyledMoves';

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
      const pv = (this.parseEval(ev).pv) ? this.parseEval(ev).pv : this.state.pv
      this.setState({
        raw: ev,
        cp,
        pv,
      })
    }
  }

  resetEval = () => {
    this.setState({
      cp:0,
      pv:'Calculating'
    })
  }

  componentDidUpdate(prevProps) {
    if ((this.props.fen !== prevProps.fen) || (this.props.depth !== prevProps.depth)) {
      this.resetEval();
      this.updateEval();
    }
  }

  formatMoves = (mvs) => {
    const varLength = this.props.varMoves.length;
    const start = this.props.currentMove + varLength;
    const formattedMoves = []
    mvs.forEach((m, i) => {
      const halfMoveNum = i + start;
      let mvNum = ((halfMoveNum) % 2 === 0) ? `${(halfMoveNum / 2) + 1 }.` : null;
      if (halfMoveNum % 2 === 1 && i === 0) {
        mvNum = `${Math.ceil(i + start / 2)}. \u2026`;
      }
      formattedMoves.push(
        <span key={i}>
          {mvNum} {m}
          {(halfMoveNum % 2 === 1)? <br/> : ''}
        </span>
      )
    })
    return formattedMoves;
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
    const cpRE =  /cp (.?\d+)/;
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
    const isHiddenClass = (this.state.isHidden) ? 'hide-InfoCard-info' : 'show-InfoCard-info' ;
    const hideShowButtonText = (this.state.isHidden) ? 'Show' : 'Hide';

    const animationStyle = {
      animationDurration: "1s",
      animationName: `${isHiddenClass}`,
    }

    movesArr.pop();
    movesArr.shift();
    // const moves = this.formatMoves(movesArr);
    return(
    <div className="InfoCard">
      <div className="InfoCard-title">Engine Evaluation</div>
      <div className="InfoCard-info"
         style={animationStyle}>
        <p>Best move: {this.state.pv.split(' ')[1]}</p>
          <span>score:{(this.state.cp / 100)}</span>
          <meter
            title="centipawns"
            value={(this.state.cp) ? this.state.cp / 100 : 0}
            min= "-4"
            max= "4"
            optimum= "0"
            >
        </meter>
        <div className="Eval-principal-var">Computer Variation: {<br/>}
          <StyledMoves
            varMoves={movesArr}
            currentMove={this.props.currentMove + this.props.varMoves.length}
            />
        </div>
      </div>
      <div className={"InfoCard-button-wrapper"}>
      <button onClick={this.hideEvalFrame}> {hideShowButtonText } </button>
      </div>
    </div>
    )
  }
}

export default Eval;
