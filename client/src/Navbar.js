import React, {useContext} from 'react';
import Authorize from './Authorize';
import {Link} from 'react-router-dom';
import { AuthContext } from './AuthorizeContext';
import "./Navbar.css"


const Navbar = props => {
	const {isAuthenticated, user, setIsAuthenticated, setUser} = useContext(AuthContext);
	const onClickLogoutHandler = () => {
		Authorize.logout().then(data => {
			if (data.success) {
				setUser(data.user)
				setIsAuthenticated(false);
			}
		});
	}
	
	const unauthenticatedNavBar = () => {
		return (
			<div className="nav-items">
				<Link to ='/login'>
					<h4 id="logstyle"><a>Log In</a></h4>
				</Link>
				<Link to ='/register'>
					<h4><a>Register</a></h4>
				</Link>
			</div>
		)
	}
	
	const authenticatedNavBar = () => {
		return (
			<>
				<h4><a onClick={onClickLogoutHandler}>Log Out</a></h4>
			</>
		)
	}
	return(
		<header>
			<Link to ='/'>
				<h3>Money Manager</h3>
			</Link>
			<div>
				{ !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
			</div>
		</header>
	)
}

export default Navbar;