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
        this.handleCheckGiftCertificate = this.handleCheckGiftCertificate.bind(this);
    }

    render() {
        const type = this.props.ghInfo.type;
        const transactionId = this.props.ghInfo.orderId;
        const transDateTimeStr = this.props.ghInfo.completedDate;

        if (type == 'Donation') {
            const charityName = this.props.ghInfo.charityName;
            const amount = this.props.ghInfo.donationAmount;

            return (
                <tr>
                    <td><input type="checkbox" onChange={this.handleCheckDonation}/></td>
                    <td>{moment(transDateTimeStr, "MMMM Do, YYYY h:mm:ss A").format("MM/DD/YYYY")}</td>
                    <td>{transactionId}</td>
                    <td>{charityName}</td>
                    <td style={{textAlign: 'right'}}>${amount.toFixed(2)}</td>
                </tr>
            );
        }
        else if (type == 'GiftCertificate') {
            const amount = this.props.ghInfo.gcAmount;

            return (
                <tr>
                    <td><input type="checkbox" onChange={this.handleCheckDonation}/></td>
                    <td>{moment(transDateTimeStr, "MMMM Do, YYYY h:mm:ss A").format("MM/DD/YYYY")}</td>
                    <td>{transactionId}</td>
                    <td>Gift Certificate</td>
                    <td style={{textAlign: 'right'}}>${amount.toFixed(2)}</td>
                </tr>
            );
        }
        else {
            const amount = this.props.ghInfo.feeAmount;
            const feeType = this.props.ghInfo.feeType;

            return (
                <tr>
                    <td>&nbsp;</td>
                    <td>{moment(transDateTimeStr, "MMMM Do, YYYY h:mm:ss A").format("MM/DD/YYYY")}</td>
                    <td>{transactionId}</td>
                    <td>{feeType.name}</td>
                    <td style={{textAlign: 'right'}}>${amount.toFixed(2)}</td>
                </tr>
            );
        }
    }

    handleCheckDonation() {
        this.props.checkDonation(this.props.ghInfo.donationId);
    }

    handleCheckGiftCertificate() {
        this.props.checkGiftCertificate(this.props.ghInfo.giftCertificateId);
    }
}

export default GivingHistoryItem;
