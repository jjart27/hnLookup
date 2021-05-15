import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Input, Button } from '@material-ui/core';
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

	searchHandler = event => {
		this.props.newsSearch(this.state.value)
	}

	render() {
		const { props } = this.props
		// console.log("search render")
		// console.log("state: ", this.state)
		console.log("props: ", this.props)

		const searchResults = _.get(this.props,'searchResults', []);
		let resultsCount;
		if (searchResults.length > 0) {
			resultsCount = <div>{this.props.searchResults.length} results found</div>;
		}

		const searchMessage = _.get(this.props,'searchMessage');
		let resultsMessage;
		if (searchMessage) {
			resultsMessage = <div>{searchMessage}</div>;
		}

		return (
			<div>

				<div>search</div>

					<div>
					<Input
						multiline={false}
						onChange={this.handleChange}
						value={this.state.value}
					/>
					</div>

					<div>
					<Button variant="outlined"  aria-label="Search"  onClick={this.searchHandler} >
						Search
					</Button>
					</div>

					<hr />
					
					{resultsMessage}
					{resultsCount}

					{searchResults.map(function(r, index){
						return <div key={ index }>{r.title}</div>;
					})}

					<hr />

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
