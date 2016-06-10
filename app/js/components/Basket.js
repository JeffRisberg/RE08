import React from 'react'
import { connect } from 'react-redux';

import { clearBasket, removeDonation } from '../actions/context';
import { displayLogin, displayCheckout, displayUpdateDonation } from '../actions/pageName';

import Donation from './Donation'

/**
 * Shows the donor's current basket contents
 *
 * @author Jeff Risberg
 * @since March 2016
 */
class Basket extends React.Component {
    constructor(props) {
        super(props);

        this.state = {order: null};
        this.clearBasket = this.clearBasket.bind(this);
    }

    clearBasket() {
        if (this.props.context != undefined && this.props.context != null) {
            this.props.clearBasket();
        }
    }

    render() {
        if (this.props.context != undefined && this.props.context != null) {

            const donations = (this.props.order !== null && this.props.order !== undefined) ?
                this.props.order.donations : null;

            if (donations != null && donations != undefined && donations.length > 0) {
                let self = this;
                var donationItems = donations.map(function (donation) {
                    return (
                        <div className="row">
                            <div className="col-md-8">
                                <Donation donation={donation} key={donation.id}></Donation>
                            </div>
                            <div className="col-md-4" style={{textAlign: 'right'}}>

                                <button onClick={ () => {self.props.displayUpdateDonation(donation)}}>Update Donation
                                </button>

                                <button onClick={ () => {self.props.removeDonation(donation.id)}}>Remove Donation
                                </button>
                            </div>
                        </div>
                    );
                });

                const checkoutButton = (this.props.context.donor != undefined && this.props.context.donor != null)
                    ? (<div style={{padding: '10px', border: '1px solid gray'}}>
                    <a onClick={this.props.displayCheckout}>
                        Proceed to Checkout
                    </a>
                </div>)
                    : (<div style={{padding: '10px', border: '1px solid gray'}}>
                    <p>
                        Please <a onClick={this.props.displayLogin}>log in</a> first to check out.
                    </p>
                </div>);

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
                return (
                    <div className="content-region">
                        <div className="content-header">Giving Basket</div>
                        <div>Your basket is empty.</div>
                    </div>
                )
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
    return {
        context: state.context,
        order: state.orders.records[state.context.orderId]
    };
};

export default connect(
    mapStateToProps,
    {clearBasket, removeDonation, displayUpdateDonation, displayLogin, displayCheckout}
)(Basket);
