import React from 'react'
import { connect } from 'react-redux';

import { updateGift } from '../actions/context';
import { setForm, handleFormFieldChange, clearForm } from '../actions/forms';

function getDonation(state, donationId) {
    const order = state.orders.records[state.context.orderId];
    console.log('props.params.donationId: ' + donationId)
    return order.donations.find((donation) => {
        if (donation.id == donationId) {
            return donation;
        }
    })
}

const formName = 'giftForm';

class GiftMessage extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const donation = this.props.selections['Gift'];

        console.log('gift donation: ' + JSON.stringify(donation));

        const gift = donation.gift;
        this.formData = (donation === null) ? {} : {
            recipientName: gift.recipientName,
            memorialName: gift.memorialName,
            message: gift.message,
            recipientEmail: gift.recipientEmail
        };

        this.props.setForm(formName, this.formData)
    }

    componentWillUnmount() {
        this.props.clearForm(formName)
    }

    render() {
        const donation = this.props.selections['Gift'];

        if (this.props.form == null || donation == null || donation.gift == null) return null;

        return (
            <div>
                <h3>Gift Options</h3>

                <form onSubmit={this.handleSubmit}>
                    <p>
                        You are donating to: <br/> {donation.charity.name}
                    </p>

                    <p>Name of person to notify: <input type="text" name="recipientName"
                                                        defaultValue={this.props.form.recipientName}
                                                        onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/></p>
                    {(donation.gift.memorialName)
                        ? <p>In memory of: <input type="text" name="memorialName"
                                                  defaultValue={this.props.form.memorialName}
                                                  onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/></p>

                        : null}
                    <p>
                        <textarea name="message" onChange={(e) => {this.props.handleFormFieldChange(formName, e)}} value={this.props.form.message}/>
                    </p>

                    <p>Email address:
                        <input type="text" name="recipientEmail" value={this.props.form.recipientEmail}
                               onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/></p>

                    <input type="submit" value="Continue"/>
                </form>
            </div>
        );
    }

    handleSubmit(e) {
        e.preventDefault();

        const donation = this.props.selections['Gift'];

        this.props.updateGift(donation.id, donation.gift.id, this.props.form)
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        form: state.forms[formName],
        selections: state.selections
    };
};
export default connect(
    mapStateToProps,
    {updateGift, setForm, handleFormFieldChange, clearForm}
)(GiftMessage);