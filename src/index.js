import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
/* original
ReactDOM.render( 
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/
class Circle extends React.Component{
  render(){
    return(
      <button id = "button" className = "circle" onClick = {()=>this.props.onClick()}>{this.props.value}</button>
    )};
}
class CircleBoard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      circles : Array(3).fill("white")
    }
  }
  makeBlack(i){
    var circles2 = this.state.circles.slice();
    if(circles2[i] != "black")
      circles2[i] = "black";
    else
      circles2[i] = "white";
    this.setState({circles : circles2});
    
  }
  renderCircle(i){
    return(
      <Circle value = {this.state.circles[i]} onClick = {()=>this.makeBlack(i)}></Circle>
    )
  }
  render(){
    return(
      <div>
        {this.renderCircle(0)}
        {this.renderCircle(1)}
        {this.renderCircle(2)}
      </div>
      
    )
  }
}

class Square extends React.Component {
  /*
  constructor(props){
    super(props);
    this.state = {
      value : null
    };
  }
  */
  msg(){
    console.log("Hello!");
  }
  
  /*
  setVal(){
    this.setState(
      {
        value : 'X'
      }
    )
  }
  */
  render() {
    return (
      <button 
        className="square" 
        onClick = {() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares : Array(9).fill(null),
    }
  }

  handleClick(i){
    const squares = this.state.squares.slice();
    squares[i] = "X";
    this.setState({squares : squares});
  }
  renderSquare(i) {
    return (
    <Square 
      value={this.state.squares[i]} 
      onClick = {() => this.handleClick(i)}
    />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render( 
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

/*
Thoughts before the "why is immutability important" section:
What we've done so far is, from the CSS, we made squares, and we managed to build a board composed of these squares by repeatedly calling renderSquare(i)
wherein the i is like its position on the board (like a square's id). Now it was proven that its difficult to keep track of the states of each square
from the Board component if each square is keeping track of its own state (X or O or null). The solution was for the Board component to keep track of 
all its squares' states. This act of retrieving data from multiple children to a parent component can be done by passing a function to its children.
What we did is we made another prop (property) of a single square called onClick, which calls the handleClick() handler method of Board component
to handle clicks made from each square. Meaning, each square now has an event handler when a click is made, and this event is handled by the handleClick().
We also set its value to its own position from the square array state of the Board comp. This square array keeps track of all the states of each squares,
wherein it gets updated by the handleClick(), by simple changing the square[i] to a value. Each square button in the square component also has its own
onClick event handler. When an individual square is clicked, it calls on the this.props.onClick(). Remember that we assigned a property to each squares
earlier called onClick(). This this.props.onClick() refers to the onClick() property, and this onClick() property is the one that calls the handleClick(i)
method, so its like the event of clicking the button of a square is propagated upwards to the Board component, so it can keep track of the state of a square.
After it has propagated up, based on which square was clicked (represented by i), it updates the this.state.squares[i] state of the board to a value 
by doing this.setState({squares : squares}), wherein the state square of the Board component copies from the local array squares, which has the
updated states of the squares. 

This now means that each square components are now controlled components in React terms of the Board component. The Board component has total control
of all the square components.
*/