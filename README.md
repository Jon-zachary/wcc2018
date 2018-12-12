# WCC 2018 game tracker
[Fide Chess World Championship 2018](https://fidewcc2018.now.sh)
## What it's about
This is a React.js application that allows users to view the games from the recent (2018) Fide
world chess championship. It stores the games as pgn(portable game notation)
files and sets up a GUI for the user to examine them.

## Features
As well as being able to go through the games in the GUI, the user is presented
with four game related panels.

 - The move list panel shows the moves of the game which the user can click on to
 skip ahead directly to the game position which corresponds to that move. The
 current move is highlighted making navigating the move list easy.
 - The variation panel shows variations which the user can input through the GUI.
 The user can click a button and return to the main game at any time.
 - The info panel shows the basic game information like which round, game result
 etc.
 - The evaluation panel shows what the chess engine Stockfish thinks about the
 current position. Running Stockfish as a web worker ensures that that it is
 non-blocking.

 The app is styled with flexbox and is responsive.

## Technologies
- React.js
- Flexbox
- [Stockfishjs](https://github.com/nmrugg/stockfish.js/)
- [chess.js](https://github.com/jhlywa/chess.js/blob/master/README.md)
- [chessboardjsx](https://github.com/willb335/chessboardjsx)

## Next steps
- Currently neither the eval or variation panes allow stepping through the move or
clicking on the displayed moved. This is the most pressing functionality to add.

- The styling for handheld devices can be streamlined.

- There are many a11y features to be added like tabbing through the move list,
keyboard support, color selection etc.


## Next Next steps
The core functionality of the app does need to be tied down to a particular set
of games. It would be nice to add the ability to hit an api that serves pgn games
and use them instead of just the 2018 wcc games.
A backend that allows users to store their favorite games along with their own variations would also be cool.
