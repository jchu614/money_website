import React, {useState, useContext} from 'react';
import {Route , withRouter} from 'react-router-dom';
import {AuthContext} from './AuthorizeContext';
import moneyservice from './moneyservice';
import Message from './Message';
import './Register2.css'

const RegisterAmount = props => {
	const [amount, setAmount] = useState({moneyStart: 0, moneyLeft: 0});
	const [message, setMessage] = useState(null);
	const authContext = useContext(AuthContext);
	
	const onChange = e => {
		setAmount({...amount, [e.target.name]: e.target.value})
	}
	
	const resetForm = ()=> {
		setAmount({moneyStart: 0, moneyLeft: 0});
	}
	
	const onSubmit = e => {
		e.preventDefault();
		moneyservice.postAmount(amount).then(data=> {
			const { message, user } = data;
			setMessage(message);
			authContext.setIsAuthenticated(data.isAuthenticated)
			resetForm();
			props.history.push('/loading')
		});
	}
	
	return(
		<div className="App input-box Register2">
			<form onSubmit={onSubmit}>
				<h3>Input Money Data:</h3>
				<label htmlFor="moneyStart">Starting Amount: </label>
				<input type="number" 
					name="moneyStart" 
					value={amount.moneyStart}
					onChange={onChange} 
					pattern="[0-9]*" 
				  	inputMode="numeric"
					placeholder="$XX.xx">
				</input>
				<label htmlFor="moneyLeft">How Much is Left: </label>
				<input type="number" 
					name="moneyLeft" 
					value={amount.moneyLeft}
					onChange={onChange} 
					placeholder="$XX.xx">
				</input>
				<button className="submit-button" 
					type="submit">Submit Amount
				</button>
			</form>
			{message ? <Message message={message}/> : null}
		</div>
	)
}

export default withRouter(RegisterAmount);