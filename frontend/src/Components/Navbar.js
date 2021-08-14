import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import "../CSS/Navbar.css";

class Navbar extends React.Component {
	render() {
		const user = null;
		return (
			<div className='navbar'>
				<Link to='/' className='home-link'>
					<div className='logo'>PHARMACIES APP</div>
				</Link>
				<div className='button-container'>
					{user ? (
						<>
							<div className='avatar'>
								<Avatar>A</Avatar>
							</div>
							<div className='btn'>
								<button className='logout-btn'>LogOut</button>
							</div>
						</>
					) : (
						<>
							<div className='btn'>
								<Link to='/login'>
									<button className='login-btn'>Log In</button>
								</Link>
							</div>
							<div className='btn'>
								<Link to='/register'>
									<button className='login-btn'>Register</button>
								</Link>
							</div>
						</>
					)}
				</div>
			</div>
		);
	}
}

export default Navbar;
