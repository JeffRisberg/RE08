import React from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux';

import { queryCategoryCharities } from '../actions/charities';

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

        this.currentCategory = null
    }

    componentDidMount() {
        this.reloadIfNeeded();
    }

    render() {
        this.reloadIfNeeded();

        const blockId = this.props.blockId;

        if (blockId != null && blockId != undefined) {
            const charityIds = this.props.charities.idLists[blockId] || [];
            const charityRecords = charityIds.map(id => this.props.charities.records[id]);

            const charityListHeader = (this.currentCategory != null)
                ? <div style={{fontWeight: 'bold', fontSize: '15px'}}>Displaying charities
                for {this.currentCategory.name}</div>
                : null;

            var charityNodes = charityRecords.map((charity, index) => {
                return (
                    <Charity charity={charity} key={index}></Charity>
                );
            });

            return (
                <div>
                    {charityListHeader}
                    <table className="table">
                        <tbody>
                        {charityNodes}
                        </tbody>
                    </table>
                </div>
            );
        }
        else {
            return <div>Missing blockId</div>;
        }
    }

    reloadIfNeeded() {
        const blockId = this.props.blockId;
        const sourceId = this.props.categorySourceId;
        const sourceCategory = this.props.selections[sourceId];

        // If there is a change in selection, requery the charities
        if (sourceCategory != undefined && sourceCategory != null && this.currentCategory != sourceCategory) {
            this.props.queryCategoryCharities(sourceCategory, blockId);
        }
        this.currentCategory = sourceCategory;
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
