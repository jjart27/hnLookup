import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(reduxThunk));

import './index.css';
import App from './App';

ReactDOM.render(
	<Provider store={store}>
	  <React.StrictMode>
	    <App />
	  </React.StrictMode>
	</Provider>, 
	document.getElementById('root')
);