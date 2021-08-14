import React, { useEffect, useState } from "react";
import {Avatar, TextField} from "@material-ui/core";
import Axios from "axios";
import {Autocomplete} from "@material-ui/lab";
import { Link, useHistory } from "react-router-dom";
import "../CSS/Navbar.css";
import qs from "qs";

export default function Navbar() {
	const [user, setUser] = useState(localStorage.getItem("token"));
	const [items, setItems] = useState([]);
	const history = useHistory();
	const handleLogout = () => {
		localStorage.getItem("token") && localStorage.removeItem("token");
		setUser(null);
		history.push("/login");
	};
	useEffect(() => {
		localStorage.getItem("token") && setUser(localStorage.getItem("token"));
		Axios.get(`http://localhost:8000/api/item/`).then((res) => {
			setItems(res.data["items"]);
		});
	}, [user]);
	const onSearchBarChange = (event, item) => {
		if (item == null) return;
		console.log(item);
		const data = { id: item.pk, amount: 1};
		const url = "http://localhost:8000/api/cart/";
		const options = {
			method: "POST",
			headers: { "content-type": "application/x-www-form-urlencoded" },
			body: qs.stringify(data),
			credentials: "include",
		};
		fetch(url, options).then((res) => console.log(res.json()));
	};
	return (
		<div className="navbar">
			<Link to="/" className="home-link">
				<div className="logo">MEDGUIDE</div>
			</Link>
			<Autocomplete
				className="searchbar"
				options={items}
				getOptionLabel={(item) => item["name"]}
				onChange={onSearchBarChange}
				renderInput={(params) => (
					<TextField {...params} label="Search" variant="outlined" />
				)}
			/>
			<div className="button-container">
				{console.log(user)}
				{user ? (
					<>
						<div className="avatar">
							<Avatar>A</Avatar>
						</div>
						<div className="btn">
							<Link to="/video">
								<button className="login-btn">
									Consult Doctor
								</button>
							</Link>
						</div>
						<div className="btn">
							<button
								className="logout-btn"
								onClick={handleLogout}
							>
								LogOut
							</button>
						</div>
					</>
				) : (
					<>
						<div className="btn">
							<Link to="/login">
								<button className="login-btn">Log In</button>
							</Link>
						</div>
						<div className='btn'>
							<Link to='/video'>
								<button className='login-btn'>Consult Doctor</button>
							</Link>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
