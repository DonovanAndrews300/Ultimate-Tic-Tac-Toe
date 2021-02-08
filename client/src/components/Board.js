import React from 'react';
import ReactDOM from 'react-dom';
import Square from './Square'

export default class Board extends React.Component {
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
        <div className={"board"}>
          <div className="status">{'Tic-Tac-Toe Ultimate Showdown!'}</div>
          <div >{'Share with a friend to start a game!'}</div>
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