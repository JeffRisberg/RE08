import React from 'react'

import Charity from './Charity'

/**
 * Renders one donation.  Used on the Basket screen and the Confirmation screen.
 *
 * @author Jeff Risberg, Brandon Risberg
 * @since March 2016
 */
class Donation extends React.Component {

    constructor() {
        super();
    }

    render() {
        var charityName = this.props.donation.charity.name;
        var amount = this.props.donation.amount;
        var recipientName = (this.props.donation.gift == null) ? null : this.props.donation.gift.recipientName;
        var memorialName = (this.props.donation.gift == null) ? null : this.props.donation.gift.memorialName;

        return (
            <div style={{marginBottom: '15px'}}>
                <Charity charity={this.props.donation.charity} showAddress={this.props.showCharityAddress}  showCharityEin={this.props.showCharityEin}/><br/>
                Amount: ${amount.toFixed(2)}
                <br/>
                Designation: {this.props.donation.designation}
                <br/>
                Share Name: {this.props.donation.shareName ? "Yes" : "No"},
                Share Address: {this.props.donation.shareAddress ? "Yes" : "No"},
                Share Email: {this.props.donation.shareEmail ? "Yes" : "No"}
                <br/>
                Gift Name: {recipientName}
                <br/>
                Memorial Name: {memorialName}
                <hr/>
            </div>
        );
    }
}

export default Donation;
