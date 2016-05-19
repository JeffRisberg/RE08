import React from 'react'
import { Link } from 'react-router'

import moment from 'moment';

/**
 * Renders one givingHistoryItem
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
        const points = this.props.donation.amount;
        const amount = points / 10;

        return (
            <tr>
                <td><input type="checkbox" onChange={this.handleCheckDonation}/></td>
                <td>{moment(transDateTimeStr,"MMMM Do, YYYY h:mm:ss A").format("MM/DD/YYYY")}</td>
                <td>{transactionId}</td>
                <td>{charityName}</td>
                <td>{points.toFixed(0)} Points (${amount.toFixed(2)} to the charity)</td>
            </tr>
        );
    }

    handleCheckDonation() {

        console.log("adding checked donation " + this.props.donation.charity.name + " for " + this.props.donation.amount);

        this.props.checkDonation(this.props.donation.id);
    }
}

export default GivingHistoryItem;