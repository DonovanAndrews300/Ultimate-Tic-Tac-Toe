import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board'
import ReactHowler from 'react-howler'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faVolumeUp, faVolumeMute} from '@fortawesome/free-solid-svg-icons'


class Game extends React.Component {
  
  constructor() {
    super()
    this.state = {
      themeOn:true,
      game: [ '', '', '', '', '', '', '', '', '' ],
      currentPlayer :null,
      gameActive:true
  };
    this.handleGameStateUpdate = this.handleGameStateUpdate.bind(this)
    this.socket = new WebSocket('ws://localhost:4000');
    

   
}

componentDidMount(){
 this.initWebSocket()
 
}

  initWebSocket(){
    this.socket.addEventListener('open', () =>  {
      console.log("connected to websockt server")
  
    this.socket.addEventListener('message', (event) => {
      const parsedData = JSON.parse(event.data)
     if(parsedData != this.state){
       const { game, currentPlayer,  gameActive} = parsedData
      console.log("incoming message is ", game,currentPlayer, gameActive)
      this.setState({
        game,
        gameActive
      })
     }
    })
   
    })
  }

  

  

  /**
   * Updates the gamestate array and the html grid
   * @param  {function} clickedCellIndex
   */
  handleGameStateUpdate(cellIndex,currentPlayer) {
    
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
    
    this.handleResult()

}


 /**
   * Displays winner of the game
 */
showResults(){
  if(!this.state.gameActive){
    if(!this.state.game.includes('')){
      return "Its a draw!"
    }
  return this.state.currentPlayer === "O" ? "Winner is O": "Winner is X"
  }
}

   /**
   * Handles result validation
 */
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


    if (roundWon || roundDraw) {
        this.setState({gameActive:false},() => this.socket.send(JSON.stringify(this.state)));
      return
    }

    this.socket.send(JSON.stringify(this.state));
    return
}

  /**
   * Restarts the game
 */
  handleRestartGame() {
    this.setState({
      game: [ '', '', '', '', '', '', '', '', '' ],
      currentPlayer :null,
      gameActive:true
  })
}

  handleGameTheme(){
    if(this.state.themeOn === true){
      this.setState({themeOn:false})
      return
    }
    else{
      this.setState({themeOn:true})
      return
    }
        
  }
  


  render() {

    return (
      <div className="game">
        <div className="game-board">
          <Board gameState={this.state} updateGameState={this.handleGameStateUpdate}/>
        </div>
        <div className="game-info">

        <ReactHowler
        src={['themesong.mp3']}
        playing={this.state.themeOn}
        loop={true}
      />
          <div>{this.showResults()}</div>
          <ol><button onClick={() => this.handleRestartGame()}>{"Restart"}</button></ol>
          {
            this.state.themeOn ?
            <ol><button onClick={() => this.handleGameTheme() }><FontAwesomeIcon icon={faVolumeUp}/></button>
            </ol>
            :
            <ol><button onClick={() => this.handleGameTheme() }><FontAwesomeIcon icon={faVolumeMute}/></button></ol>
          }
        </div>
      </div>
    );
  }
}

export default Game
