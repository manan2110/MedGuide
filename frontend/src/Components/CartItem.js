import React from "react";
import "../CSS/CartItem.css";

export default function CartItem({ curr }) {
	return (
		<div className='cartitem'>
			<div className='cartitem__image'>
				<img src={curr.image_url} alt='Product' className='cart__image' />
			</div>

			<p className='cartItem__name'>{curr.name}</p>

			<p className='cartitem__price'>&#8377; {Math.round(curr.price)}</p>
			<select className='cartItem__select' value={curr.amount}>
				{[...Array(curr.max_amount).keys()].map((x) => (
					<option key={x + 1} value={x + 1}>
						{x + 1}
					</option>
				))}
			</select>
		</div>
	);
}
