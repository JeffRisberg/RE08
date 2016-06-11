import React from 'react'
import { connect } from 'react-redux';

import { clearBasket } from '../actions/context';
import { displayLogin, displayCheckout} from '../actions/pageName';

import Donation from '../components/Donation'
import Donations from '../components/Donations'

/**
 * Shows the donor's current basket contents
 *
 * @author Jeff Risberg
 * @since March 2016
 */
class BasketBlock extends React.Component {
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

            console.log('this.props.block.displayButtons: ' + this.props.block.displayButtons)
            if (donations != null && donations != undefined && donations.length > 0) {
                var donationItems = (<Donations order={this.props.order} displayButtons={this.props.block.displayButtons}
                                                showCharityAddress={this.props.block.showCharityAddress} showCharityEin={this.props.block.showCharityEin} />)

                const checkoutButton = (<div style={{padding: '10px', border: '1px solid gray'}}>
                                            <a onClick={this.props.displayCheckout}>Proceed to Checkout</a>
                                        </div>);
                const loginPrompt = (<div style={{padding: '10px', border: '1px solid gray'}}>
                                        <p>Please <a onClick={this.props.displayLogin}>log in</a> first to check out.</p>
                                    </div>);

                const clearBasket = (<div style={{padding: '10px', border: '1px solid gray'}}>
                                        <button onClick={this.clearBasket}>Clear Basket</button>
                                    </div>);

                return (
                    <div className="content-region">
                        <div className="content-header" dangerouslySetInnerHTML={{__html: this.props.block.headerText}}></div>

                        <div style={{padding: '10px', border: '1px solid gray'}}>
                            {donationItems}
                        </div>

                        {(this.props.block.displayButtons !== "true") ? null :
                            (this.props.context.donor != undefined && this.props.context.donor != null) ? checkoutButton : loginPrompt}

                        {(this.props.block.displayButtons === "true") ? clearBasket : null}
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
    {clearBasket, displayLogin, displayCheckout}
)(BasketBlock);
