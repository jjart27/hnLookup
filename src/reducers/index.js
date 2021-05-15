import {
		NEWS_SEARCH
} from '../actions/types';

import _ from 'lodash';

export default function(state = { searchHistory: [] }, action) {
	// console.log(" reducer");
	// console.log(" action: ", action);
	// console.log(" state: ", state);

	switch (action.type) {
			case NEWS_SEARCH:
				// console.log('reducer NEWS_SEARCH: ', action)
				let searchHistory = state.searchHistory || []

				if (_.get(action.payload,'query')) {
					searchHistory.push(action.payload.query)
				}

				return { 
					...state, 
					searchResults: _.get(action.payload,'results', []), 
					searchMessage: _.get(action.payload,'message'), 
					searchHistory: searchHistory
				}
	}

	return state;

}

