import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../CSS/Cart.css";
import CartItem from "../Components/CartItem";

export default function Cart() {
	const [cartItem, setCartItems] = useState(null);
	const [cartAmount, setCartAmount] = useState(null);
	const [cartPrice, setCartPrice] = useState(null);

	useEffect(() => {
		async function getCartData() {
			await Axios.get("http://localhost:8000/api/cart/", {
				withCredentials: true,
			}).then((res) => {
				setCartItems(res.data.cart.items);
				setCartAmount(res.data.cart.total_amount);
				setCartPrice(Math.round(res.data.cart.total_price));
			});
		}
		getCartData();
	}, []);
	return (
		<div className='cartscreen__container'>
			<div className='cartscreen__left'>
				{cartItem && cartItem.map((curr) => <CartItem curr={curr} />)}
			</div>
			<div className='cartscreen__right'>
				<div className='cartscreen__info'>
					<p>Subtotal ({cartAmount}) items</p>
					<p>Rs {cartPrice}</p>
				</div>
				<div>
					<button className='checkout'>Proceed to checkout</button>
				</div>
			</div>
		</div>
	);
}
