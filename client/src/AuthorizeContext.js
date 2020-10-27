import React, {createContext, useState, useEffect} from 'react';
import Authorize from './Authorize';
import "./AuthorizeContext.css";

export const AuthContext = createContext();

export default ({ children }) => {
	const [user, setUser] = useState(null);
	const [data, setData] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [trigger, setTrigger] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	
	useEffect(() => {
		Authorize.isAuthenticated().then(data => {
			setUser(data.user);
			setData(data.data);
			setIsAuthenticated(data.isAuthenticated);
			setIsLoaded(true);
			setTrigger(false);
		});
	}, [isAuthenticated, trigger]);
	
	return (
		<div>
			{!isLoaded ? 
				<div className="App1">
					<h1>Working with Database</h1>
				</div> : 
				<AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated, trigger, setTrigger}}>
					{ children }
				</AuthContext.Provider>}
		</div>
	)
}