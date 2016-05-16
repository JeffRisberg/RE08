import React from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux';

import { queryCategoryCharities } from '../actions/currentCharities';

import Charity from './Charity'

/**
 * Renders a list of charity objects, by subscribing to a categoryList and fetching its charities.
 *
 * @author Jeff Risberg
 * @since March 2016, Updated May 2016
 */
class CharityList extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        // make the first fetch
        this.props.queryCategoryCharities();
    }

    render() {
        // if there is a change in selection, requery the charities.

        if (this.props.charities != null) {
            var charityNodes = this.props.charities.map(function (charity, index) {
                return (
                    <Charity charity={charity} key={index}></Charity>
                );
            });

            return (
                <table className="table">
                    <tbody>
                    {charityNodes}
                    </tbody>
                </table>
            );
        }
        else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        charities: state.charities,
        selections: state.selections
    };
};
export default connect(
    mapStateToProps,
    {queryCategoryCharities}
)(CharityList);
