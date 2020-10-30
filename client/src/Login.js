import React, {useState, useContext} from 'react';
import Authorize from './Authorize';
import {Link} from 'react-router-dom';
import Message from './Message';
import {AuthContext} from './AuthorizeContext';
import "./Login.css"

const Login = props => {
	const [user, setUser] = useState({username: "", password: ""});
	const [message, setMessage] = useState(null);
	const authContext = useContext(AuthContext);

	const onChange = e => {
		e.preventDefault();
		setUser({...user, [e.target.name]: e.target.value})
	}
	
	
	const onSubmit = e => {
		e.preventDefault();
		Authorize.login(user).then(value =>{
			const {isAuthenticated, user, message} = value;
			if(isAuthenticated) {
				authContext.setUser(user);
				authContext.setIsAuthenticated(isAuthenticated);
				props.history.push('/loading')
			}
			else
				setMessage(message);
		});
	}
	
	return(
		<div className="App input-box Login">
			<form onSubmit={onSubmit}>
				<h1>Please Sign In</h1>
				<label htmlFor="username">Username: </label>
				<input type="text" 
					name="username" 
					onChange={onChange} 
					placeholder="username">
				</input>
				<label htmlFor="password">Password: </label>
				<input type="password" 
					name="password" 
					onChange={onChange} 
					placeholder="password">
				</input>
				<button className="submit-button" 
					type="submit">Log In
				</button>
			</form>
			<Link to ='/register'>
				<button>New User</button>
			</Link>
			{message ? <Message message={message}/> : null}
		</div>
	)
}

export default Login;