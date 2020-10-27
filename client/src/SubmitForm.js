import React, {useState} from 'react';
import './SubmitForm.css'


const SubmitForm = props => {
	const [amount, setAmount] = useState({value: ""});
	const [message, setMessage] = useState(null);
	
	const onChange = e => {
		setAmount({...amount, [e.target.name]: e.target.value})
	}
	
	const resetForm = ()=> {
		setAmount({value: ""});
	}
	
	const onSubmit = e => {
		e.preventDefault();
		props.subtractValue(amount.value)
		resetForm();
	}
	
	return(
		<div className="input-box" id="Submit-form">
		  <form>
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
				 type="submit"
				 onClick={onSubmit}
				 >AMOUNT SPENT</button>
		  </form>
		</div>
	)
}

export default SubmitForm;