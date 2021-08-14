import qs from "qs";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../CSS/Pharmacy.css";

export default function Pharmacy({ pharmacies }) {
	const { id } = useParams();
	const [currentPharmacy, setCurrentPharmacy] = useState(null);
	const [selectedAmount, setSelectedAmout] = useState(0);
	useEffect(() => {
		pharmacies.map((curr) => {
			if (curr.eLoc === id) setCurrentPharmacy(curr);
		});
	}, []);

	const handleOnChange = (e) => {
		setSelectedAmout(parseFloat(e.target.value));
	};

	const handleAdd = (id) => {
		const data = { id, amount: selectedAmount };
		const url = "http://localhost:8000/api/cart/";
		const options = {
			method: "POST",
			headers: { "content-type": "application/x-www-form-urlencoded" },
			body: qs.stringify(data),
			credentials: "include",
		};
		fetch(url, options);
	};
	return (
		<div className='pharmacy-container'>
			<div className='container-left'>
				{currentPharmacy &&
					currentPharmacy.items.map((medItems, id) => (
						<div className='medicine-item' key={id}>
							<div className='medicine-image'>
								<img
									src={medItems.image_url}
									alt='Product'
									className='cart__image'
								/>
							</div>
							<p className='medicine-name'>{medItems.name}</p>
							<p className='medicine-price'>
								&#8377; {Math.round(medItems.price)}
							</p>
							<select
								className='medicine-select'
								defaultValue={1}
								onChange={handleOnChange}>
								{[...Array(medItems.amount).keys()].map((x) => (
									<option key={x + 1} value={x + 1}>
										{x + 1}
									</option>
								))}
							</select>
							<button
								className='medicine-addToCartBtn'
								onClick={() => handleAdd(medItems.pk)}>
								ADD
							</button>
						</div>
					))}
			</div>
			<div className='container-right'>
				<div className='pharmacy-details-container'>
					<span className='pharmacy-details-name pharmacy-details-medicine'>
						{currentPharmacy && currentPharmacy.placeName}
					</span>
					<span className='pharmacy-details-medicine'>
						{currentPharmacy && currentPharmacy.distance} meters from you
					</span>
					<span className='pharmacy-details-medicine'>
						{currentPharmacy && currentPharmacy.placeAddress}
					</span>
				</div>
				<div className='goto-cart'>
					<Link to='/cart'>
						<button className='goto-cart-button'>Go To Cart</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
