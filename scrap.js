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

// {props.moves.map((move, i , self) => {
//   const white = i + 1;
//   const black = i + 2;
//   const mvNum = Math.floor(i / 2) + 1
//   const active = 'highlight'
//   return (
//     <span className="singleMove" key={i}>
//       <span>{mvNum}: </span>
//       <span className={`${(props.currentMove === white) && active} link-button`} onClick={(evt) => props.handleMoveClick(evt,white)}>{move} </span>
//       <span className={`${(props.currentMove === black) && active} link-button`} onClick={(evt) => props.handleMoveClick(evt,black)}> {self[i + 1]}</span>
//     </span>
//     )
// })}

// <Slider
//   min={5}
//   max={25}
//   step={1}
//   onChange={this.handleSlide}
//   val={this.state.evalDepth}
//   />

/* .CountDown-container {
  display: flex;
  justify-content: space-between;
  font-family: Dosis, sans-serif;
  font-size: 55px;
  color: white;
  background-color: black;
}

.TimeUnit {
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.TimeName {
  font-size: 20px;
  color: #5e5e5e;
  font-weight: bolder;
} */

// style={{"backgroundColor": `${isHiddenColorClass}`}}

// Goals for refactoring:
// 1) Bring some semblance of consistency to code style
  // a) all methods will be arrow functions instead of bound in constructor
  // b) css will have consistent naming conventions.
// 2) Find a way to reuse code for the info, var, ml, and eval comps
//  they share enough in common that there should be a way to make their
//  comonalitites portable.
// 3) Find a way to reuse format move function.


// Methodology for refactoring CSS -- GO SLOW YOU DONKEY!
// Waiting to find out what price;
// You have to pay to get out of;
// Going through all these things twice.
// Do not rename, change props or in anyway alter more than 1 class at a time!!!!
// Move Parents to top of children.
// 1. Removed height 100% from body and html, no change
// 2. Removed height and width 100% from App no change.
// 3. Header - removed height: fit-content no change, flex wrap has no change
// on fullscreen but make mobile worse #notsyaingmuch
// 4. changed Player-Title to Player-name. Better meaning and why cap on second word?
// 5. Removed button-wrapper. no change. probably rename InfoCard-buton-wrapper to
// something more generic.
// 6. Remove multi-board, no change.
// 7. Optimistically thinking that I'm going to create one card component for the
// information panes going to rename eval-buton-wrapper to InfoCard-button-wrapper
// changed it all good!
// 8. Changed game-container to main-body-container. hard to cature the idea of
// the main container for everything that isn't the header. everything working.
// 9. Remove game-header. all good.
// 10. So board-container is basically doing nothing. can remove all but margins
// without effect. Going to do that for now but bottom margin is weird, leaving note
// 11. change currentDepth to current-depth. not used now but i may use slider
// comp in future if I get eval working smoother.
// 12. change depthLevel to depth-level, see above.
// 13. remove evaluation. all good. git commit here.
// 14. remove varEval. all good.
// 15. remove movesEval. all good.
// 16. change movelist to MoveList to reflect that it's applied to top div of
// component, will hopefully be able to change to something generic after a
// refactor.
// 17. Changed .moves to MoveList-moves to better show relationship. The whole
// Concept of moves is really a mess right now, shouldn't matter what component
// they're viewed in.
// 18. changed movesTitle to InfoCard-title again with the optimism.
// 19. remove .info, all good. what a big name for a do nothing class.
// 20. merged two .pv classes (it happens to all the masters!) and renamed to
// Eval-principal-var for clarity.
// 21. Remove eval-container. I get that ozymandias feeling when I look at my
// abandoned class names.
// 22. just a note that the meter element needs the webkit suffix to be styled.
// 23. remove move-button-wrapper & move-button-wrapper button. No ill effects
// 24. changed gameInfo and gameInfo p to game-info. This will prob change again
// after InfoCard refactor but for now it's better style.
// 25. remove display:flex etc from GameHeader, small change but not noticable
// Time to commit.
// 26. On to the tricky stuff. I think I don't need a seperate MoveList and Eval
// CSS I'm using each twice but one for all 4 should work. Here I go, wish me luck
// future self!
// 27. It worked! all info-container-whatevers are now class MoveList. Maybe I should
// just go all the way and rename it to InfoCard???! not yet, that will be a treat
// for actually doing the refactoring.
// 28. again with the insides of the InfoCards there are 4 classes where I think 1 will do
// gonna give it a shot. Yeah so Movelist-moves works in all 4 spots.
// 29 Remove EvalInfo, game-info etc. Styling is a little worse but way easier
// to read/think about.
// 30. first fuck up. changed everything from MoveList and MoveList-moves to
// InfoCard and InfoCard info. now variations container is empty. So it's ok that
// it's empty it's becuase no content initialy but animation not working. looking
// at that now. Now none of the anis are working.
// Problem was that anis were named in removed classes, easy fix. Allows for Better
// ani names anyway #silverlining.
