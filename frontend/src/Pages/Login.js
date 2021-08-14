import React from "react";
import { useHistory } from "react-router-dom";
import "../CSS/Login.css";
import { useState, useEffect } from "react";
import Sawo from "sawo";

const Login = () => {
	const [isUserLoggedIn, setUserLoggedIn] = useState(false);
	const [payload, setPayload] = useState({});
	const history = useHistory();

	useEffect(() => {
		localStorage.removeItem("token");
		var config = {
			containerID: "sawo-container",
			identifierType: "email",
			apiKey: "1becc7cb-07ea-4477-8d7f-2c4f4581febb",
			onSuccess: (payload) => {
				console.log("Payload : " + JSON.stringify(payload));
				setUserLoggedIn(true);
				setPayload(payload);
				localStorage.setItem("token", payload.verification_token);
				history.push("/");
			},
		};
		console.log(config);
		let sawo = new Sawo(config);
		sawo.showForm();
		if (localStorage.getItem("token")) {
			setUserLoggedIn(true);
		}
	}, []);
	return (
		<div className='containerStyle'>
			<section>
				<h2 className='title'>MedGuide Login</h2>
				<h2 className='title'>User Logged In : {isUserLoggedIn.toString()}</h2>

				{!isUserLoggedIn ? (
					<div className='formContainer' id='sawo-container'></div>
				) : (
					<div className='loggedin'>
						<h2>User Successful Login</h2>
						<div>UserId: {payload.user_id}</div>
						<div>Verification Token: {payload.verification_token}</div>
					</div>
				)}
			</section>
		</div>
	);
};

export default Login;
