import React, { useEffect, useState } from "react";
import Axios from "axios";
import CardTiles from "../Components/CardTiles";
import "../CSS/Home.css";

export default function Home() {
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
	const user = localStorage.getItem("token");
	if (user) {
		return (
			<div className='home-container'>
				{pharmacies &&
					pharmacies.map((pharmacy) => <CardTiles pharmacy={pharmacy} />)}
			</div>
		);
	} else {
		return (
			<div className='home-container'>
				<p className='login-message'>Please Login To Continue</p>
			</div>
		);
	}
}
