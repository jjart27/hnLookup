import Search from './components/search.js';
import History from './components/history.js';

import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink
} from "react-router-dom";


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
