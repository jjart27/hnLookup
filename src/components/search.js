import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { newsSearch, clearSearchResults } from '../actions';
import _ from 'lodash';

import SearchRecord from './searchrecord.js';
import Pagination from './pagination.js';


class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: "",
			showData: false,
			curPage: 1
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
		// console.log("submitHandler / ", this.state.value, this.state.curPage, (this.props.searchCurPage + 1))
		// this.props.newsSearch(this.state.value, this.state.curPage)
		this.props.newsSearch(this.state.value)
	}

	showFullData = event => {
		this.setState({
			showData: !this.state.showData
		})
	};

	prevPage = event => {
		console.log("prevPage...")
		// this.setState({ curPage: (this.props.searchCurPage - 1 )})
		// this.submitHandler()
		this.props.newsSearch(this.state.value, (this.props.searchCurPage - 1) )
	}

	nextPage = event => {
		console.log("nextPage...", this.props.searchCurPage + 1)
		// this.setState({ curPage: (this.props.searchCurPage + 1) })
		// this.submitHandler()
		this.props.newsSearch(this.state.value, (this.props.searchCurPage + 1) )
	}

	render() {
		const { props } = this.props

		console.log("search - ", this.props)

		// search results message if any
		const searchMessage = _.get(this.props,'searchMessage');
		let resultsMessage;
		if (searchMessage) {
			resultsMessage = <div className="errMessage">{searchMessage}</div>;
		}

		// search results
		const searchResults = _.get(this.props,'searchResults', []);
		let resultsCount;
		if (searchResults.length > 0) {
			resultsCount = <span>{this.props.searchResults.length} results returned</span>;
		}

		const pages = _.get(this.props,'searchPages',0)

		// const curPage = _.get(this.props,'searchCurPage') || this.state.curPage

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

				<Pagination 
					curPage={this.props.searchCurPage} 
					pages={pages} 
					prevPage={this.prevPage} 
					nextPage={this.nextPage} 
					key="1" 
				/>

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

const mapStateToProps = ({ searchResults, searchPages, searchMessage, searchCurPage }) => {
	return {
		searchResults: searchResults,
		searchPages: searchPages,
		searchCurPage: searchCurPage,
		searchMessage: searchMessage
	};
}

const mapDispatchToProps = { newsSearch, clearSearchResults };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
