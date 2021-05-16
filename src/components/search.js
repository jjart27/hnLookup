import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { newsSearch } from '../actions';
import _ from 'lodash';

class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ""
		}
	}


	handleChange = event => {
		this.setState({
			value: event.target.value
		})
	};

	submitHandler = event => {
		console.log(this.state.value, " / ", this.state.value.length)
		if (this.state.value.length > 2) {			
			this.props.newsSearch(this.state.value)

			this.setState({
				textFieldMessage: null
			})
		} else {
			this.setState({
				textFieldMessage: "Please enter a valid search term."
			})
		}
	}

	render() {
		const { props } = this.props

		// console.log("search render")
		// console.log("state: ", this.state)
		console.log("props: ", this.props)
		console.log("state: ", this.state)

		const searchResults = _.get(this.props,'searchResults', []);
		let resultsCount;
		if (searchResults.length > 0) {
			resultsCount = <div className="resultsCount"><span>{this.props.searchResults.length} results returned</span></div>;
		}

		const searchMessage = _.get(this.props,'searchMessage');
		let resultsMessage;
		if (searchMessage) {
			resultsMessage = <div>{searchMessage}</div>;
		}

		return (
			<div>

				<h1>search</h1>
				<p>
					Use the search field below to search the Hacker News Algolia API and displays a list of results.
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

					<span style={{ color:"red", paddingLeft:"20px" }}>{this.state.textFieldMessage}</span>

					</div>

					
					{resultsMessage}
					{resultsCount}

					<div className="searchResultsList">
					{searchResults.map(function(r, index){
						return <div key={ index }>{r.title}</div>;
					})}
					</div>

					<hr />

					<span >view raw data</span>
					<pre className="codeBlock">
						{JSON.stringify(this.props.searchResults, null, 2) }
					</pre>

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

const mapDispatchToProps = { newsSearch };

// export default Search
export default connect(mapStateToProps, mapDispatchToProps)(Search);
