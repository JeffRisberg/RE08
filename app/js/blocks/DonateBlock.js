import React from 'react'
import { connect } from 'react-redux';

import { addDonation, updateDonation } from '../actions/context';
import { setSelection } from '../actions/selections';

import DonationForm from '../components/DonationForm'

/**
 * Donate screen
 *
 * @author Jeff Risberg, Peter Cowan, Brandon Risberg
 * @since May 2016
 */
class DonateBlock extends React.Component {
    constructor(props) {
        super(props);

        this.handleAddDonation = this.handleAddDonation.bind(this);
        this.handleUpdateDonation = this.handleUpdateDonation.bind(this);
    }

    handleAddDonation(e, formData) {
        e.preventDefault();

        const ein = this.props.selections['Donate'].ein;

        this.props.addDonation(formData, ein);
    }

    handleUpdateDonation(e, formData) {
        e.preventDefault();

        const donation = this.props.selections['Donate'].donation;

        this.props.updateDonation(formData, donation.id);
    }

    render() {
        if (this.props.context != null) {

            const ein = this.props.selections['Donate'].ein;
            const charity = this.props.charities.records[ein];

            if (this.props.selections['Donate'].donation) {
                const donation = this.props.selections['Donate'].donation;

                const giftName = (donation.gift != null) ? donation.gift.recipientName : null;
                const memorialName = (donation.gift != null) ? donation.gift.memorialName : null;
                return (<DonationForm charity={charity} handleSubmit={this.handleUpdateDonation} block={this.props.block} amountChanged={this.props.setSelection} formData={{ amount: donation.amount,
                        shareName: donation.shareName, shareEmail: donation.shareEmail, shareAddress: donation.shareAddress,
                        designation: donation.designation, giftName: giftName, memorialName: memorialName}}/>)
            } else {
                return (<DonationForm charity={charity} handleSubmit={this.handleAddDonation} block={this.props.block} amountChanged={this.props.setSelection} formData={{ amount: null,
                        shareName: false, shareEmail: false, shareAddress: false,
                        designation: null, giftName: null, memorialName: null}}/>)
            }
        }
        else {
            return (
                <div>
                    <p>Please log in first to make a donation.</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        context: state.context,
        charities: state.charities,
        selections: state.selections
    };
};
export default connect(
    mapStateToProps,
    {setSelection, addDonation, updateDonation}
)(DonateBlock);
