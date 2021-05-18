import React, { Component } from 'react';
import { connect } from 'react-redux';

class Notes extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>miscellanous...</h1>
				<p>
					One quick note. I had a branch I worked on for pagination. 
					I got to a point where the mechanics were coming together. 
					I could click 'next' and 'prev' and update the search and pagination display. 
					However, as I proceded farther into the page count, eventually I noticed that the 
					returned number of pages and hits <em>decreased</em>! 
					I think I've seen this before with ElasticSearch aggregations, which might be what's going 
					on in this case. 
					Anyhow, I punted the pagination feature, but kept the in-progress branch on github.
				</p>

			</div>
		)
	}

}


export default Notes;
