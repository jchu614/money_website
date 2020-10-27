import React, {useState, useEffect, useContext} from 'react';
import moneyservice from './moneyservice';
import RegisterAmount from './Register2';
import SubmitForm from './SubmitForm';
import Settings from './Settings'
import { AuthContext } from './AuthorizeContext';
import './Moneypg.css';

const Moneypg = props => {
	const [moneyStart, setMoneyStart] = useState(); 
	const [moneyLeft, setMoneyLeft] = useState();
	const [showMenu, setShowMenu] = useState(false);
	const [message, setMessage] = useState(null);
	const authContext = useContext(AuthContext);
	

	useEffect(() => { 
		moneyservice.getMoney().then(data => {
			if (!data.data) {
				return;
			}
			else if (data.data.length == 0) {
				return;
			} else {
				const startData = data.data[0].moneyStart.toFixed(2);
				const leftData = data.data[0].moneyLeft.toFixed(2);
				setMoneyStart(startData);
				setMoneyLeft(leftData);
			}
		});
	}, [moneyLeft, moneyStart]);
	
	//TOGGLING MENU FUNCTIONS
	const toggleMenu = () => {
		setShowMenu(!showMenu)
	}
	
	
	//HANDLING DB/STATE VALUES FUNCTIONS
	const subtractValue = val => {
		const id = authContext.user.data;
		let newAmount = moneyLeft - val;
		moneyservice.editAmount(id, newAmount)
			.then(data => {
			let num = data.moneyLeft.toFixed(2);
			setMoneyLeft(num);
		});
	};
	
	const newTotal = val => {
		const id = authContext.user.data
		moneyservice.editStart(id, val)
			.then(data => {
			let num = data.moneyLeft.toFixed(2);
      		let num2 = data.moneyStart.toFixed(2);
			setMoneyLeft(num);
			setMoneyStart(num2);
			toggleMenu();
		});
	};
	
	const resetAmount = () => {
		const id = authContext.user.data;
		let newAmount = moneyStart;
		moneyservice.editAmount(id, newAmount)
			.then(data => {
			let num = data.moneyLeft.toFixed(2);
			setMoneyLeft(num);
			toggleMenu();
		})
	}
	
	const registerAmount = val => {
    let num = val.moneyLeft.toFixed(2);
    let num2 = val.moneyStart.toFixed(2);
    setMoneyStart(num2);
    setMoneyLeft(num);
    console.log(authContext.trigger);
    moneyservice
      .postAmount(val)
      .then(authContext.setTrigger(!authContext.trigger));
  };
	
	
	//RETURNED JSX FUNCTIONS
	const hasData = () => {
		return (
			<div className="container">
				{ showMenu === true ? menu() : appDisplay() }
			</div>
		)
	}
	
	const noData = () => {
		return (
			<RegisterAmount registerAmount={registerAmount}/>
		)
	}
	
	const redirect = () => {
		return (
			props.history.push('/login')
		)
	}
	
	const menu = () => {
		return (
		<Settings 
			newTotal={newTotal} 
			resetAmount={resetAmount} 
			toggleMenu={toggleMenu}
		/>
		)
	}
	
	const appDisplay = () => {
		return (
		<div className="App">
			<div className="header">
				<h1> Money Left:</h1>
				<h2>${moneyLeft}</h2>
			</div>
			<SubmitForm subtractValue={subtractValue} />
			<button className="settings-btn" onClick={toggleMenu}>SETTINGS</button>
		</div>
		)
	}
	
	return(
		<div>
			{!authContext.user.data
				? redirect()
				: authContext.user.data.length == 0
				? noData()
				: hasData()
			}
		</div>
		
	)
}

export default Moneypg;