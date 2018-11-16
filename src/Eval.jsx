import React, { Component } from 'react';

class Eval extends Component {
  constructor(props) {
    super(props)
    this.state = {
      res: null,
      fen: props.fen,
      depth: props.depth,
      }
    }

   componentDidUpdate(prevProps) {
     if ((this.props.fen !== prevProps.fen) || (this.props.depth !== prevProps.depth)) {
       const sf = window['stockfish'];
       sf.postMessage(`position fen ${this.props.fen}`)
       sf.postMessage(`go depth ${this.props.depth}`)
       sf.onmessage = (evt) => {
         this.setState({
           res: evt.data
         })
       }
     }
   }

  render() {
  if(this.props.isEval){
  return(
    <div className="evaluation">
      evaluation: {this.state.res}
    </div>
    )
  }
  return <div></div>
  }
}

export default Eval;
