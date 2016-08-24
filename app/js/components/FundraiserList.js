import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import { fetchFundraisers } from '../actions/fundraisers';

import Fundraiser from './Fundraiser'

/**
 * Renders a list of fundraisers
 *
 * @author Jeff Risberg
 * @since August 2016
 */
class FundraiserList extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        console.log("call to componentDidMount");
        this.props.fetchFundraisers();
    }

    render() {
        if (this.props.fundraisers != undefined && this.props.fundraisers != null) {
            var fundraiserNodes = this.props.fundraisers.map(function (fundraiser, index) {
                return (
                    <Fundraiser fundraiser={fundraiser} key={index}></Fundraiser>
                );
            });

            return (
                <table className="table">
                    <tbody>
                    {fundraiserNodes}
                    </tbody>
                </table>
            );
        }
        else {
            return (<p>No fundraisers yet</p>);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        fundraisers: state.fundraisers
    };
};

export default connect(
    mapStateToProps,
    {fetchFundraisers}
)(FundraiserList);
