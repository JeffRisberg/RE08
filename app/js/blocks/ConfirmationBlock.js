import React from 'react'
import { connect } from 'react-redux';

import Donations from '../components/Donations'
import { fetchOrderById } from '../actions/orders';

/**
 * Render the confirmation screen
 *
 * @author Peter Cowan
 * @since April 2016
 */
class ConfirmationBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var orderId = this.props.selections['Confirmation'];
        this.props.fetchOrderById(orderId);
    }

    render() {
        if (this.props.order != null && this.props.order != undefined) {

            console.log('order ' + JSON.stringify(this.props.order, null, 2))
            const donations = this.props.order.donations;

            if (donations != null && donations != undefined && donations.length > 0) {
                return (
                    <div>
                        <p>Your confirmation number is {this.props.order.id}</p>
                        <Donations order={this.props.order} displayButtons={this.props.block.displayButtons}
                                                showCharityAddress={this.props.block.showCharityAddress} showCharityEin={this.props.block.showCharityEin} />
                    </div>);
            }
        }
        return null;
    }
}

function selectOrder(state, orderId) {
    if (orderId) {
        return state.orders.records[orderId]
    }
    return null;
}

const mapStateToProps = (state, ownProps) => {
    return {
        selections: state.selections,
        order: selectOrder(state, state.selections['Confirmation'])
    };
};

export default connect(
    mapStateToProps,
    {fetchOrderById}
)(ConfirmationBlock);