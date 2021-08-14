import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";

class App extends React.Component {
	render() {
		return (
			<div className='app'>
				<Router>
					<Navbar />
					<Route exact path='/' component={Home} />
				</Router>
			</div>
		);
	}
}

export default App;
