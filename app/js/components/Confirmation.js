import React from 'react'
import { connect } from 'react-redux';

import Donation from './Donation'
import { fetchOrderById } from '../actions/orders';

/**
 * Render the confirmation screen
 *
 * @author Peter Cowan
 * @since April 2016
 */
class Confirmation extends React.Component {
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
                var donationNodes = donations.map(function (donation) {
                    return (
                        <Donation donation={donation} key={donation.id}></Donation>
                    );
                });

                return (
                    <div className="content-region">
                        <div className="content-header">Order Confirmation</div>

                        <p>Thank you for your generous donations.</p>

                        <p>Your confirmation number is {this.props.order.id}</p>

                        <div style={{padding: '10px', border: '1px solid gray'}}>
                            {donationNodes}
                        </div>
                    </div>
                );
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
)(Confirmation);