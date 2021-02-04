import React from 'react';
import ReactDOM from 'react-dom';
export default class Square extends React.Component {

    constructor(){
      super()
    }
  
    
  
    changePlayerSquare(){
      const filledSquare = this.props.gameState.game[this.props.cellIndex]
      const {currentPlayer} =  this.props.gameState
  
      if(filledSquare===''){
        if(currentPlayer === 'X'){
      this.props.updateGameState(this.props.cellIndex, 'O' )
    }
      if(currentPlayer === null || currentPlayer === 'O'){
    this.props.updateGameState(this.props.cellIndex, 'X' )
  }
   }
   if(filledSquare!=''){
  this.props.updateGameState(this.props.cellIndex, '' )
    }
    }
  
    disableButton(){
      return this.props.gameState.gameActive ? false : true
    }
  
  
    render() {
      const disable = this.disableButton()
      return (
        <button ref={this.cellContent} disabled ={disable} onClick={() => this.changePlayerSquare()} className="square">
          {this.props.gameState.game[this.props.cellIndex]}
        </button>
      );
    }
  }