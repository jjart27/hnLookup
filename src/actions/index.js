import { get } from 'axios';

import {
	NEWS_SEARCH
} from './types';

import _ from 'lodash';

export const newsSearch = (query) => {

	return function (dispatch) {

	// console.log("newsSearch: ", query);

	const request_url = `http://hn.algolia.com/api/v1/search?query=${query}`

	// console.log("request_url: ", request_url)

	get(request_url)
		.then(response => {
			let payload = {}
			// console.log("newsSearch response: ", response)
			// console.log("response.data.hits: ", response.data.hits)
			// console.log('hits length: ', _.get(response,'data.hits', []).length)

			if (_.get(response,'data.hits', []).length > 0) {
				console.log("got hits! : ", response.data.hits)
				payload = {
					results: response.data.hits, 
					query: query
				}
			} else {
				payload = { message: `No results found for '${query}'` }
				console.log(payload.message)
			}
			
			dispatch({ type: NEWS_SEARCH, payload: payload });
			
		})
		.catch(err => {
			console.log("error...", err)
				dispatch({ type: NEWS_SEARCH, payload: { message: 'no results found' }});
		});

		dispatch({ type: NEWS_SEARCH, payload: {} });
	};
}