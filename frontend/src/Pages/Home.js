import React from "react";
import CardTiles from "../Components/CardTiles";
import "../CSS/Home.css";

export default function Home({ pharmacies }) {
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
