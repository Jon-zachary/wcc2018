import React from 'react';

const Eval = (props) => {
   props.sf.onmessage = (evt) => {
     let res = evt.data;
     if(res.startsWith(`info depth ${props.depth}`)) {
       props.updateEval(res);
       props.sf.terminate();
     }
  }
  props.sf.postMessage('ucinewgame')
  props.sf.postMessage(`position fen ${props.fen}`)
  props.sf.postMessage(`go depth 5`)
  return(
    <div className="evaluation">
      evaluation: {props.sfEval}
    </div>
  )
}

export default Eval;
