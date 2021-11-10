import React from "react"

class Button extends React.Component{
    constructor(){
        super();
        this.state = {
            count : 0
        }
    }
    addCount = () => {
        this.setState(
            {
                count : ++this.state.count
            }
        )
    }
    
    render(){
        return(
            <div>
                <button onClick={this.addCount}>Click me!!</button>
                <p>count = {this.state.count}</p>
            </div>
        )
    }
}

export default Button;
