import React from 'react'

import moment from 'moment';

/**
 * Renders one givingHistoryItem
 *
 * @author Jeff Risberg
 * @since March 2016
 */
class GivingHistoryItem extends React.Component {

    constructor(props) {
        super(props);

        this.handleCheckDonation = this.handleCheckDonation.bind(this);
    }

    render() {
        const transactionId = this.props.order.id;
        const transDateTimeStr = this.props.order.transactionDate;
        const charityName = this.props.donation.charity.name;
        const amount = this.props.donation.amount;

        return (
            <tr>
                <td><input type="checkbox" onChange={this.handleCheckDonation}/></td>
                <td>{moment(transDateTimeStr,"MMMM Do, YYYY h:mm:ss A").format("MM/DD/YYYY")}</td>
                <td>{transactionId}</td>
                <td>{charityName}</td>
                <td style={{textAlign: 'right'}}>${amount.toFixed(2)}</td>
            </tr>
        );
    }

    handleCheckDonation() {
        this.props.checkDonation(this.props.donation.id);
    }
}

export default GivingHistoryItem;