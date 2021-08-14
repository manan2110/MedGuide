import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Axios from "axios";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";

export default function App() {
	const [pharmacies, setPharmacies] = useState([]);
	const [lat, setLatitude] = useState(null);
	const [long, setLongitude] = useState(null);
	useEffect(() => {
		async function getPharmacy() {
			navigator.geolocation.getCurrentPosition(function (position) {
				setLatitude(position.coords.latitude);
				setLongitude(position.coords.longitude);
			});
			long &&
				(await Axios.get(`http://localhost:8000/api/pharmacy`, {
					params: { latitude: lat, longitude: long },
				}).then((res) => {
					setPharmacies(res.data.nearby_pharmacies);
				}));
		}
		getPharmacy();
	}, [long]);

	return (
		<div className='app'>
			<Router>
				<Navbar />
				<Route exact path='/login' component={Login} />
				<Route exact path='/cart' component={Cart} />
				<Route exact path='/'>
					<Home pharmacies={pharmacies} />
				</Route>
			</Router>
		</div>
	);
}
