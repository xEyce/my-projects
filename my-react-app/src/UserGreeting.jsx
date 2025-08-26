
function UserGreeting(props){
    
    return(props.isLoggedIn ?
         <h2>Welcome {props.name}</h2> :
         <h2>Please Log in</h2>)
    
   
}

export default UserGreeting