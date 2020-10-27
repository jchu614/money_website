import React, {useContext} from 'react';
import Moneypg from './Moneypg'
import Settings from './Settings'
import Login from './Login';
import Navbar from './Navbar'
import Register from './Register';
import RegisterAmount from './Register2';
import Loading from './Loading';
import Message from './Message';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import AuthProvider from "./AuthorizeContext";
import './App.css';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Navbar />
				<Route path="/hidden" component={Message} />
				<Route path="/loading" component={Loading} />
				<Route path="/login" component={Login}/>
				<Route path="/register" component={Register}/>
				<Route path="/register2" component={RegisterAmount}/>
				<Route path="/settings" component={Settings} />
				<Route exact path="/" component={Moneypg}/>
			</Router>
		</AuthProvider>
	)
}

export default App;


//"Paralax" by Drew Selby is licensed under CC BY 2.0