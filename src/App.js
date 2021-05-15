import Search from './components/search.js';
import History from './components/history.js';

import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink
} from "react-router-dom";

import logo from './logo.svg';
import './App.css';

function App() {
	return (
		<div className="wrapper">
 		<Router>
			<nav>
				<ul>
					<li>
						<NavLink exact activeClassName="active" to="/">Search</NavLink>
					</li>
					<li>
						<NavLink exact activeClassName="active" to="/history">History</NavLink>
					</li>
				</ul>
			</nav>

				{/*
					A <Switch> looks through all its children <Route>
					elements and renders the first one whose path
					matches the current URL. Use a <Switch> any time
					you have multiple routes, but you want only one
					of them to render at a time
				*/}
				<Switch>
					<Route exact path="/">
						<Search />
					</Route>
					<Route path="/history">
						<History />
					</Route>
				</Switch>
			
		</Router>
		</div>
	);
}

export default App;
