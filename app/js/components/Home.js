import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';

import TopCharitiesScroller from './TopCharitiesScroller';
import Browse from './Browse';
import { displaySearchPage } from '../actions/pageName';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <img src="/resources/images/HomeImage.jpg" width="100%"/>
                </div>
                <div className="content-region">
                    <div className="row">
                        <div className="col-md-4">
                            <h3>Top Charities</h3>

                            <p>
                                Redeem your rewards, donate to a top charity.
                            </p>

                            <p>
                                <a onClick={() => ReactDOM.findDOMNode(this.refs.topCharities).scrollIntoView()}>
                                    View List
                                </a>
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h3>Support a Cause</h3>

                            <p>Browse a list of popular charities by Cause</p>

                            <p>
                                <a onClick={() => ReactDOM.findDOMNode(this.refs.byCause).scrollIntoView()}>
                                    View Causes
                                </a>
                            </p>
                        </div>

                        <div className="col-md-4" style={{background: '#f0f0f'}}>
                            <h3>Find a Charity</h3>

                            <p>Search for any charity by name or location</p>

                            <p>
                                <a onClick={() => {this.props.displaySearchPage()}}>Search Now</a>
                            </p>
                        </div>
                    </div>
                </div>
                <TopCharitiesScroller ref='topCharities' block={{id: '1-4-9-16'}}/>
                <Browse ref='byCause'/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(
    mapStateToProps,
    {displaySearchPage}
)(Home);
