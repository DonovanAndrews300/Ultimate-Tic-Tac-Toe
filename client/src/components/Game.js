import React from 'react';
import ReactDOM from 'react-dom';
import './Game.css'



  /**
   * saves gamestate to the database

  saveGameState() {
      console.log(this.gameRoom);

      return this._dataClient.postGameState(this.gameRoom.name, this.gameState);
  }
   */

  /**
   * gets a list of gamestates from the backend server
   * @param  {string} roomName
 
  loadGameState(roomName) {
      return this._dataClient.getGameState(roomName);
  }
  */

 
  

  ////////////////////////REACT

class Square extends React.Component {

  constructor(){
    super()
    this.state = {
      filledSquare : '' ,
    }
  }

  

  changePlayerSquare(){

    if(this.state.filledSquare===''){
      if(this.props.gameState.currentPlayer === 'X'){
    this.props.updateGameState(this.props.cellIndex, 'O' )
    this.setState({filledSquare:this.props.gameState.currentPlayer})
  }
    if(this.props.gameState.currentPlayer === 'O'){
  this.props.updateGameState(this.props.cellIndex, 'X' )
  this.setState({filledSquare:this.props.gameState.currentPlayer})
}
 }
 if(this.state.filledSquare!=''){
this.props.updateGameState(this.props.cellIndex, '' )
this.setState({filledSquare:''})
  }
  }

  disableButton(){
    return this.props.gameState.gameActive ? false : true
  }


  render() {
    const disable = this.disableButton()
    return (
      <button disabled ={disable} onClick={() => this.changePlayerSquare()} className="square">
        {this.state.filledSquare}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(){
    super()
  }

  componentDidMount(){
    this.setState({game:this.props.updateGameState})
  }
  renderSquare(cellIndex) {
    return <Square cellIndex={cellIndex} gameState={this.props.gameState} updateGameState={this.props.updateGameState} />;
  }



  render() {
 
    const boardRow = [0,1,2]
    const boardRow2 =  [3,4,5]
    const boardRow3 = [6,7,8]

    return (
      <div>
        <div className="status">{'board rendered'}</div>
        <div className="board-row">
            {
              //Update the grid with the current player index
                boardRow.map((cellIndex) => this.renderSquare(cellIndex))
            }
        </div>
        <div className="board-row">
            {
                boardRow2.map((cellIndex) => this.renderSquare(cellIndex))
            }
        </div>
        <div className="board-row">
            {
                boardRow3.map((cellIndex) => this.renderSquare(cellIndex))
            }
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  
  constructor() {
    super()
    this.state = {
      game: [ '', '', '', '', '', '', '', '', '' ],
      currentPlayer :'X',
      gameActive:true
  };
    this.handleGameStateUpdate = this.handleGameStateUpdate.bind(this)
    //this.gameActive = true;
    //this.initGameState();
}

  /**
   * loads in a gamestate from the database
   
  initGameState() {
    console.log('init tictactoe');
    this.loadGameState(this.gameRoom.name).then(gamestateloaded => {
        if (gamestateloaded) {
            this.gameState = JSON.parse(gamestateloaded).gameState;
            console.log(this.gameState);
            this.updateGrid();
        }
        if (!gamestateloaded) {
            this.gameState = {
                game: [ '', '', '', '', '', '', '', '', '' ],
                players: {},
                turn: this.gameRoom.playerSession
            };

            // this.gameState.players[this.gameRoom.playerSession] = 'X';
            this.saveGameState();
        }
    });
*/
/**
   * Check to see if the game has ended after each turn
   */


  /**
   * Updates the gamestate array and the html grid
   * @param  {function} clickedCellIndex
   */
  handleGameStateUpdate(cellIndex,currentPlayer) {
    console.log('the current',)
    
    //sets the playerTurn of who used undo
    if(currentPlayer === ''){
      if(this.state.currentPlayer === 'X' ){
        this.setState({
        currentPlayer:'O',
        })
      }
      if(this.state.currentPlayer === 'O' ){
        this.setState({
        currentPlayer:'X',
        })
      }
    }

    else{
      this.setState({
        currentPlayer:currentPlayer,
      })
    }
    
    this.state.game[cellIndex] = currentPlayer
    //eventually this will have the handleResult function
    this.handleResult()
    console.log(this.state)
}



showResults(){
  if(!this.state.gameActive){
    if(!this.state.game.includes('')){
      return "Its a draw!"
    }
  return this.state.currentPlayer === "X" ? "Winner is O": "Winner is X"
  }
}

  handleResult() {
    let roundWon = false;
    const roundDraw = !this.state.game.includes('');
    const winConditions = [
        [ 0, 1, 2 ],
        [ 3, 4, 5 ],
        [ 6, 7, 8 ],
        [ 0, 3, 6 ],
        [ 1, 4, 7 ],
        [ 2, 5, 8 ],
        [ 0, 4, 8 ],
        [ 2, 4, 6 ]
    ];

    winConditions.forEach(winCondition => {
        const a = this.state.game[winCondition[0]];
        const b = this.state.game[winCondition[1]];
        const c = this.state.game[winCondition[2]];


        if (a === b && b === c) {

            if (a !== '' || b !== '' || c !== '') {
                roundWon = true;

            }
        }
    });


    if (roundWon) {
        this.setState({gameActive:false});
      return
    }


    if (roundDraw) {
      this.setState({gameActive:false});
      return
    }

    return
}

  /**
   * Restarts the game
 */
  handleRestartGame() {
    this.setState({
      game: [ '', '', '', '', '', '', '', '', '' ],
      currentPlayer :'X',
      gameActive:true
  })
  console.log(ReactDOM.findDOMNode(this).innerHTML)

}
  


  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board gameState={this.state} updateGameState={this.handleGameStateUpdate}/>
        </div>
        <div className="game-info">
      
          <div>{this.showResults()}
          </div>
          <ol><button onClick={() => this.handleRestartGame()}>{"Restart"}</button></ol>
        </div>
      </div>
    );
  }
}

export default Game
