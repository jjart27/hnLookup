import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { newsSearch, clearSearchResults } from '../actions';
import _ from 'lodash';

import SearchRecord from './searchrecord.js';


class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: "",
			showData: false,
		}

		// clear out previous search results
		this.props.clearSearchResults()
	}


	handleChange = event => {
		this.setState({
			value: event.target.value
		})
	};

	submitHandler = event => {
		this.props.newsSearch(this.state.value)
	}

	showFullData = event => {
		this.setState({
			showData: !this.state.showData
		})
	};


	render() {
		const { props } = this.props

		const searchMessage = _.get(this.props,'searchMessage');
		let resultsMessage;
		if (searchMessage) {
			resultsMessage = <div className="errMessage">{searchMessage}</div>;
		}

		const searchResults = _.get(this.props,'searchResults', []);
		let resultsCount;
		if (searchResults.length > 0) {
			resultsCount = <span>{this.props.searchResults.length} results returned</span>;
		}


		return (
			<div>

				<h1>search</h1>
				<p>
					Use the search field below to search <em>stories</em> via the Hacker News Algolia API and display a list of results.
				</p>

				<div>
					<TextField
						multiline={false}
						onChange={this.handleChange}
						value={this.state.value}
						variant="outlined" 
						placeholder="Search" 
						required
					/>

					<Button variant="outlined"  aria-label="Search"  onClick={this.submitHandler} style={{ margin:"0 0 0 15px", padding: "6px 20px" }} >
						Search
					</Button>
				</div>
					
				{resultsMessage}

				<div className="resultsCount">
					{resultsCount}
				</div>

				<div className="searchResultsList">
					{ searchResults.length > 0 ? (
						searchResults.map(function(r, index){
							return <SearchRecord props={r} key={index} />
						})
					) : null }
				</div>

				<div className="resultsCount resultsCountBtm">
					{resultsCount}
				</div>

				<hr />

				{ searchResults.length > 0 ? (
					<div style={{height:"35px", marginTop:"30px"}}>
						<span onClick={this.showFullData} className="toggleFullData">{ this.state.showData ? ( 'hide' ) : 'view' } full data</span>
					</div>
				) : null }

				{ this.state.showData ? (
					<pre className="codeBlock">
						{JSON.stringify(this.props, null, 2) }
					</pre>
				) : null }

			</div>

		)
	}

}

const mapStateToProps = ({ searchResults, searchMessage }) => {
	return {
		searchResults: searchResults,
		searchMessage: searchMessage
	};
}

const mapDispatchToProps = { newsSearch, clearSearchResults };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
