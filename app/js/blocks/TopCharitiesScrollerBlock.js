import React from 'react'
import { connect } from 'react-redux';

import BlockStateHelper from '../helpers/BlockStateHelper'
import ErrorMessage from '../components/ErrorMessage'
import Spinner from '../components/Spinner'
import { getTopCharities } from '../actions/charities';
import {REQUEST, ERROR} from '../constants/StateTypes'

import ListCharity from '../components/ListCharity';

/**
 * Draws a left-right horizontal scroller of the top charities.
 *
 * @author Peter Cowan, Jeff Risberg
 * @since April 2016
 */
class TopCharitiesScrollerBlock extends React.Component {

    constructor(props) {
        super(props);
        this.getListItems = this.getListItems.bind(this);
    }

    componentDidMount() {
        this.props.getTopCharities(this.props.block.id);
    }

    render() {
        const imageItems = this.getListItems();

        return (
            <div className="content-region">
                <div className="content-header">Top Charities</div>

                <div className="row">
                    <div className="col-md-12">
                        <ul className="horizontal-slide">
                            <Spinner blockState={this.props.blockState}/>
                            <ErrorMessage blockState={this.props.blockState}/>
                            {imageItems}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    getListItems() {
        if (this.props.topCharities == undefined) return null;

        const topCharities =
            this.props.topCharities.idList.map((id) => {
                return this.props.topCharities.records[id]
            });

        // Remember that the topCharities are listCharity objects
        return topCharities.map(function (topCharity, index) {
            return (<ListCharity listCharity={topCharity} index={index} key={index}/>
            );
        });
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        topCharities: state.topCharities,
        blockState: new BlockStateHelper(state.blockStates[ownProps.block.id])
    };
};

export default connect(
    mapStateToProps,
    {getTopCharities}
)(TopCharitiesScrollerBlock);
