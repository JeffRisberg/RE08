import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import { clearBasket, removeDonation } from '../actions/context';

import Donation from './Donation'

/**
 * Shows the donor's current basket contents
 *
 * @author Jeff Risberg
 * @since March 2016
 */
class Basket extends React.Component {
    constructor() {
        super();

        this.state = {order: null};
        this.clearBasket = this.clearBasket.bind(this);
    }

    clearBasket() {
        if (this.props.context != undefined && this.props.context != null) {
            this.props.clearBasket();
        }
    }

    render() {
        if (this.props.context != null) {
            if (this.props.order == null || this.props.order === undefined) return null;

            const donations = this.props.order.donations;
            if (donations != null && donations != undefined && donations.length > 0) {
                let self = this;
                var donationItems = donations.map(function (donation) {
                    return (
                        <div className="row">
                            <div className="col-md-8">
                                <Donation donation={donation} key={donation.id}></Donation>
                            </div>
                            <div className="col-md-4" style={{textAlign: 'right'}}>
                                <Link to={"/updateDonation/" + donation.id} className="btn"
                                      key={'link' + donation.id}>
                                    Update Donation
                                </Link>

                                <button onClick={ () => {self.props.removeDonation(donation.id)}}>Remove Donation</button>
                            </div>
                        </div>
                    );
                });

                const checkoutButton = (this.props.context.donor != undefined && this.props.context.donor != null)
                ? (<div style={{padding: '10px', border: '1px solid gray'}}>
                    <Link to={"checkout/"} className="btn">
                        Proceed to Checkout
                    </Link>
                </div>)
                    : (<div style={{padding: '10px', border: '1px solid gray'}}>
                    <p>Please <Link to="/login">log in</Link> first to check out.</p>
                </div>)

                return (
                    <div className="content-region">
                        <div className="content-header">Giving Basket</div>

                        <div style={{padding: '10px', border: '1px solid gray'}}>
                            {donationItems}
                        </div>
                        {checkoutButton}
                        <div style={{padding: '10px', border: '1px solid gray'}}>
                            <button onClick={this.clearBasket}>Clear Basket</button>
                        </div>
                    </div>
                );
            }
            else {
                // fetch still pending
                return null;
            }
        }
        else {
            return (
                <div className="content-region">
                    <div className="content-header">
                        Please log in first to view your Giving Basket
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    console.log('state.context.order ' + JSON.stringify(state.orders.records[state.context.orderId], null, 2))
    return {
        context: state.context,
        order: state.orders.records[state.context.orderId]
    };
};

export default connect(
    mapStateToProps,
    {clearBasket, removeDonation}
)(Basket);
