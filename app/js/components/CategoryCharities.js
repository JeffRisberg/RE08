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
class CategoryCharities extends React.Component {

    componentDidMount() {
        const blockId = this.props.blockId;
        const sourceId = this.props.categorySourceId;
        const sourceCategory = this.props.selections[sourceId];

        if (sourceCategory != undefined) {
            this.props.queryCategoryCharities(sourceCategory, blockId);
        }
    }

    componentWillReceiveProps(nextProps) {
        const blockId = this.props.blockId;
        const sourceId = this.props.categorySourceId;
        const currentSourceCategory = this.props.selections[sourceId];
        const newSourceCategory = nextProps.selections[sourceId];

        if (newSourceCategory != undefined && currentSourceCategory != newSourceCategory) {
            this.props.queryCategoryCharities(newSourceCategory, blockId);
        }
    }

    render() {
        const blockId = this.props.blockId;
        const sourceId = this.props.categorySourceId;
        const sourceCategory = this.props.selections[sourceId];

        if (blockId != null && blockId != undefined) {
            const charityIds = this.props.charities.idLists[blockId] || [];
            const charityRecords = charityIds.map(id => this.props.charities.records[id]);

            const charityListHeader = (sourceCategory != null)
                ? <div style={{fontWeight: 'bold', fontSize: '15px'}}>Displaying charities
                for {sourceCategory.name}</div>
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
)(CategoryCharities);
