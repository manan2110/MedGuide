import { Link } from "react-router-dom";
import React from "react";
import "../CSS/CardTile.css";

export default function CardTiles({ pharmacy }) {
	const redirectLink = `/pharmacy/${pharmacy.eLoc}`;
	return (
		<div className='card-container'>
			<Link to={redirectLink} className='pharmacy-link'>
				<span className='pharmacy-details pharmacy-name'>
					{pharmacy.placeName}
				</span>
			</Link>
			<span className='pharmacy-details'>
				{pharmacy.distance} meters from you
			</span>
			<span className='pharmacy-details'>{pharmacy.placeAddress}</span>
		</div>
	);
}