import React, {useState, useContext} from 'react';
import { AuthContext } from './AuthorizeContext';
import Authorize from './Authorize';
import './Settings.css';

const Settings = props => {
	const [amount, setAmount] = useState({value: ""});
	const [message, setMessage] = useState(null);
	const {isAuthenticated, user, setIsAuthenticated, setUser} = useContext(AuthContext);
	
	const onClickLogoutHandler = () => {
		Authorize.logout().then(data => {
			if (data.success) {
				setUser(data.user)
				setIsAuthenticated(false);
			}
		});
	}
	
	const onChange = e => {
		setAmount({...amount, [e.target.name]: e.target.value})
	}
	
	const onSubmit = e => {
		e.preventDefault();
		props.newTotal(amount.value)
	}
	
	const onReset = () => {
		props.resetAmount();
	}
	
	const onClose = () => {
		props.toggleMenu();
	}
	
	return(
		<div className="menu-container">
		  <form className="settings-box">
			  <input 
				  type="number" 
				  value={amount.value}
				  onChange={onChange}
				  name="value"
				  pattern="[0-9]*" 
				  inputMode="numeric" 
				  placeholder="$XX.xx"
				  />
			 <button 
				 className="menu-button"
				 type="submit"
				 onClick={onSubmit}
				 >NEW TOTAL VALUE</button>
			 <button 
 				 type="submit"
				 onClick={onReset}
				 >RESET AMOUNT
			 </button>
			 <button 
				 type="submit"
				 onClick={onClickLogoutHandler}
				 >SIGN OUT
			</button>
			 <button 
				 type="submit"
				 onClick={onClose}
				 >CLOSE MENU
			 </button>
		  </form>
		</div>
	)
}

export default Settings