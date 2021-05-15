import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Input, Button } from '@material-ui/core';
import _ from 'lodash';


class History extends Component {
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
		// console.log("searchHandler: ", this.state);
		this.props.newsSearch(this.state.value)
	}

	componentWillReceiveProps (nextProps) {
		// console.log("componentWillReceiveProps")
		// console.log(nextProps)
		this.setState({
			searchHistory: _.get(nextProps, 'searchHistory', {} )
		})
	}

	render() {
		return (
			<Fragment>

					<div>
					<pre>
						{JSON.stringify(this.props.searchHistory, null, 2) }
					</pre>
					</div>
					<hr />
			</Fragment>
		)
	}

}

const mapStateToProps = ({ searchHistory }) => {
	return {
		searchHistory: searchHistory
	};
}

// const mapDispatchToProps = { newsSearch };

export default connect(mapStateToProps, {})(History);
