import React from 'react'

import { connect } from 'react-redux';

import { fetchCategoryCharities } from '../actions/charities';

import BlockStateHelper from '../helpers/BlockStateHelper'
import CharityItem from '../components/CharityItem'
import ErrorMessage from '../components/ErrorMessage'
import Spinner from '../components/Spinner'

/**
 * Renders a list of charity objects, by subscribing to a categoryList and fetching its charities.
 *
 * @author Jeff Risberg
 * @since March 2016, Updated May 2016
 */
class CategoryCharitiesBlock extends React.Component {

    componentDidMount() {
        const blockId = this.props.block.id;
        const sourceName = this.props.block.categorySourceName;
        const sourceCategory = this.props.selections[sourceName];

        if (sourceCategory != undefined) {
            this.props.fetchCategoryCharities(blockId, sourceCategory);
        }
    }

    componentWillReceiveProps(nextProps) {
        const blockId = this.props.block.id;
        const sourceName = this.props.block.categorySourceName;
        const currentSourceCategory = this.props.selections[sourceName];
        const newSourceCategory = nextProps.selections[sourceName];

        if (newSourceCategory != undefined && currentSourceCategory != newSourceCategory) {
            this.props.fetchCategoryCharities(blockId, newSourceCategory);
        }
    }

    render() {
        const blockId = this.props.block.id;
        const sourceName = this.props.block.categorySourceName;
        const sourceCategory = this.props.selections[sourceName];

        if (blockId != null && blockId != undefined) {
            const charityIds = this.props.charities.idLists[blockId] || [];
            const charityRecords = charityIds.map(id => this.props.charities.records[id]);

            const charityListHeader = (sourceCategory != null)
                ?
                <div style={{fontWeight: 'bold', fontSize: '15px'}}>Displaying charities for {sourceCategory.name}</div>
                : null;

            var charityNodes = (this.props.blockState.isLoading()) ? [] : charityRecords.map((charity, index) => {
                return (
                    <CharityItem charity={charity} key={index} showDetails="true"></CharityItem>
                );
            });

            return (
                <div>
                    {charityListHeader}
                    <table className="table">
                        <tbody>
                        {(this.props.blockState.isLoading()) ? <tr><td><Spinner blockState={this.props.blockState}/></td></tr> : null}
                        {(this.props.blockState.isError()) ? <tr><td><ErrorMessage blockState={this.props.blockState}/></td></tr> : null}
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

const mapStateToProps = (state, ownProps) => {
    return {
        charities: state.charities,
        selections: state.selections,
        blockState: new BlockStateHelper(state.blockStates[ownProps.block.id])
    };
};
export default connect(
    mapStateToProps,
    {fetchCategoryCharities}
)(CategoryCharitiesBlock);
