import React from 'react'
import { connect } from 'react-redux';

import { getTopCharities } from '../actions/charities';
import {REQUEST, ERROR} from '../constants/StateTypes'

import ListCharity from './ListCharity';

/**
 * Draws a left-right horizontal scroller of the top charities.
 *
 * @author Peter Cowan, Jeff Risberg
 * @since April 2016
 */
class TopCharitiesScroller extends React.Component {

    constructor(props) {
        super(props);
        this.getListItems = this.getListItems.bind(this);
    }

    componentDidMount() {
        this.props.getTopCharities(this.props.block.id);
    }

    render() {
        const spinner = (this.props.blockState && this.props.blockState.state === REQUEST) ? (<div><img src="/resources/images/spinner.gif" alt="&#128336;"/></div>) : null;
        const errorMessage = (this.props.blockState && this.props.blockState.state === ERROR && this.props.blockState.message != null) ? (<div style={{color: 'red'}}>{this.props.topCharities.error}</div>) : null;
        const imageItems = this.getListItems();

        return (
            <div className="content-region">
                <div className="content-header">Top Charities</div>

                <div className="row">
                    <div className="col-md-12">
                        <ul className="horizontal-slide">
                            {spinner}
                            {errorMessage}
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
        blockState: state.blockStates[ownProps.block.id]
    };
};

export default connect(
    mapStateToProps,
    {getTopCharities}
)(TopCharitiesScroller);
