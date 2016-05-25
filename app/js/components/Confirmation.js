import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import Donation from './Donation'
import { queryOrderById } from '../actions/orders';

function selectOrder(state, orderId) {
    const record = state.orders.records[orderId];
    console.log('orders ' + JSON.stringify(state.orders.records, null, 2))
    console.log('selected order ' + JSON.stringify(record, null, 2))
    return record
}

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
        this.props.queryOrderById(this.props.params.orderId);
    }

    render() {
        console.log('order ' + this.props.order)

        if (this.props.order != null && this.props.order != undefined) {
            console.log('order ' + JSON.stringify(this.props.order, null, 2))
            const donations = this.props.order.donations;

            console.log('donation records ' + donations)
            if (donations != null && donations != undefined && donations.length > 0) {
                console.log('donation records ' + JSON.stringify(donations, null, 2))

                var donationNodes = donations.map(function (donation) {
                    return (
                        <Donation donation={donation} key={donation.id}></Donation>
                    );
                });

                return (
                    <div className="content-region">
                        <div className="content-header">Order Confirmation</div>

                        <p>Thank you for your generous donations.</p>

                        <p>Your confirmation number is {this.props.params.orderId}</p>

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

const mapStateToProps = (state, ownProps) => {
    return {
        order: selectOrder(state, ownProps.params.orderId)
    };
};

export default connect(
    mapStateToProps,
    {queryOrderById}
)(Confirmation);