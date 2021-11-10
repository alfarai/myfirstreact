const Greet = (props) => {
    return (
        <div>
            <h1>Hello {props.name} aka {props.heroname} </h1>
            {props.children}
        </div>
    )
        
    
    
        
    
}

export default Greet;