import React from 'react'

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

        return (
            <div style={{marginBottom: '15px'}}>
                <a href="">{charityName}</a>
                <br/>Amount: ${amount.toFixed(2)}
                <br/>
                Program: {this.props.donation.designation}
                <br/>
                Share Name: {this.props.donation.shareName ? "X" : ""},
                Share Email: {this.props.donation.shareEmail ? "X" : ""},
                Share Address: {this.props.donation.shareAddress ? "X" : ""}
                <br/>
                Gift Name: {recipientName}
                <hr/>
            </div>
        );
    }
}

export default Donation;
