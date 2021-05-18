import React, { Component } from 'react';
import { connect } from 'react-redux';

class History extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>search history</h1>
				<p>
					Below is a list of unique searched terms you have used which returned results.
				</p>

				{ this.props.searchHistory.length > 0 ? (
					this.props.searchHistory.map(function(r, index){
						return <li key={index}>{r}</li>
					})
				) : <div className="errMessage">No recent search terms recorded</div> }
			</div>
		)
	}

}

const mapStateToProps = ({ searchHistory }) => {
	return {
		searchHistory: searchHistory
	};
}

export default connect(mapStateToProps, {})(History);
