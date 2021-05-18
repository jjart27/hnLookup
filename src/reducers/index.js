import {
	NEWS_SEARCH
} from '../actions/types';

import _ from 'lodash';

export default function(state = { searchHistory: [] }, action) {

	switch (action.type) {
		case NEWS_SEARCH:
			let searchHistory = state.searchHistory || []

			if (_.get(action.payload,'query')) {
				searchHistory.push(action.payload.query)
				searchHistory = _.uniq(searchHistory)
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
