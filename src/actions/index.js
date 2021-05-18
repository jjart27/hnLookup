import { get } from 'axios';

import {
	NEWS_SEARCH
} from './types';

import _ from 'lodash';

export const newsSearch = (query, page) => {
	if (query.length < 3) {
		return function (dispatch) {
			dispatch({ type: NEWS_SEARCH, payload: { results: [], message: 'please enter a valid search term' }});
		};

	} else {

		return function (dispatch) {

			if (!page || page < 0) { page = 1 } 
			console.log("page: ", page)

			const request_url = `http://hn.algolia.com/api/v1/search?query=${query}&tags=story&page=${page}`

			get(request_url)
				.then(response => {
					let payload = {}

					if (_.get(response,'data.hits', []).length > 0) {
						payload = {
							results: response.data.hits, 
							query: query,
							pages: response.data.nbPages, 
							curPage: page 
						}
					} else {
						payload = { message: `No results found for '${query}'` }
					}
					
					dispatch({ type: NEWS_SEARCH, payload: payload });
					
				})
				.catch(err => {
					console.log("error...", err)
					dispatch({ type: NEWS_SEARCH, payload: { message: 'no results found' }});
				});

		};
	}	
}



export const clearSearchResults = () =>  {
	return function (dispatch) {
		dispatch({ type: NEWS_SEARCH, payload: {} });
	}
}