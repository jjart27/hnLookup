// import axios from 'axios';
import { get } from 'axios';

import {
    NEWS_SEARCH
} from './types';



export function newsSearch(data, callback) {
	console.log("newsSearch: ", data);

	// const request_url = `http://hn.algolia.com/api/v1/search?query=foo&tags=story`

	// get(request_url, formData, config)
 //        .then(response => {
 //            setMessage({ type: 'success', message: 'Attachment uploaded successfully.' });
 //        })
 //        .catch(err => {
 //            setMessage({
 //                type: 'error',
 //                message: 'An error occurred uploading the attachment.  Please try again.',
 //            });
 //        })
 //        .finally(() => {
 //            setMessageOpen(true);
 //        });

  return function(dispatch) {
    // var payload = data;
    dispatch({
      type: NEWS_SEARCH,
      payload: {}
    });
  };

}