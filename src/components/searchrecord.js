import React, { Component } from 'react';
import _ from 'lodash';

class SearchRecord extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showData: false
		}
	}


	showFullData = event => {
		this.setState({
			showData: !this.state.showData
		})
	};

	render() {
		const { props } = this.props

		let title = props.title;
		if (_.get(props,'_highlightResult.title.value','')) {
			title = props._highlightResult.title.value
		}
		return (
			<div>
				<div style={{ overflow:"hidden", position:"relative" }} className="searchResultItem" >
					<span onClick={this.showFullData} className="toggleFullData">{ this.state.showData ? ( 'hide' ) : 'view' } full data</span>
					<div dangerouslySetInnerHTML={{ __html: title }} />
				</div>
				{ this.state.showData ? (
					<pre className="codeBlock">
						{JSON.stringify(this.props, null, 2) }
					</pre>
				) : null }
			</div>
		)
	}

}

export default SearchRecord
