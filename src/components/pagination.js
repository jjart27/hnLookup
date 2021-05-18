import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import _ from 'lodash';

class Pagination extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		const { curPage, pages } = this.props

		console.log("pag: curPage: ", curPage, pages)

		let pagesCount = <span>page {curPage} of {pages}</span>;

		return (
			<div>
				{pagesCount}

				{
					(curPage > 1) ? (
						<span className="prevButton" onClick={this.props.prevPage}>prev</span>
					) : null 
				}

				{
					(curPage < pages) ? (
						<span className="nextButton" onClick={this.props.nextPage}>next</span>
					) : null 
				}

			</div>
		)
	}

}

export default Pagination
