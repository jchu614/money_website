import React, {useState, useRef, useEffect} from 'react';
import Authorize from './Authorize';
import Message from './Message';
import './Register.css'

const Register = props => {
	const [user, setUser] = useState({username: "", password: ""});
	const [message, setMessage] = useState(null);
	let timerID = useRef(null);
	
	useEffect(() => {
		return () => {
			clearTimeout(timerID)
		}
	}, []);
	
	const onChange = e => {
		setUser({...user, [e.target.name]: e.target.value})
	}
	
	const resetForm = ()=> {
		setUser({username: "", password: ""});
	}
	
	const onSubmit = e => {
		e.preventDefault();
		Authorize.register(user).then(data=>{
			const { message } = data;
			setMessage(message);
			resetForm();
			if(!message.msgError){
				timerID = setTimeout(()=>{
					props.history.push('/login');
				}, 2000);
			}
		});
	}
	
	return(
		<div className="App input-box Register">
			<form onSubmit={onSubmit}>
				<h3>Please Register</h3>
				<label htmlFor="username">Username: </label>
				<input type="text" 
					name="username" 
					value={user.username}
					onChange={onChange} 
					placeholder="username">
				</input>
				<label htmlFor="password">Password: </label>
				<input type="password" 
					name="password" 
					value={user.password}
					onChange={onChange} 
					placeholder="password">
				</input>
				<button className="submit-button" 
					type="submit">Register
				</button>
			</form>
			{message ? <Message message={message}/> : null}
		</div>
	)
}

export default Register;