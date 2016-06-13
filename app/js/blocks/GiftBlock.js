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

/**
 * Gift block
 *
 * @author Peter Cowan, Jeff Risberg
 * @since May 2016
 */
class GiftBlock extends React.Component {
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
                <h3 dangerouslySetInnerHTML={{__html: this.props.block.headerText}}></h3>

                <form onSubmit={this.handleSubmit}>
                    <p>
                        You are donating to: <br/> {donation.charity.name}
                    </p>

                    <div className="form-group">
                        <label htmlFor="recipientName">Name of person to notify: </label>
                        <input type="text" className="form-control" id="recipientName" name="recipientName"
                               placeholder="Name"
                               defaultValue={this.props.form.recipientName}
                               onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                    </div>

                    {(donation.gift.memorialName)
                        ? <div className="form-group">
                        <label htmlFor="memorialName">In memory of: </label>
                        <input type="text" className="form-control" id="memorialName" name="memorialName"
                               placeholder="Name"
                               defaultValue={this.props.form.memorialName}
                               onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                    </div>
                        : null}

                    <div className="form-group">
                        <label htmlFor="message">A personal message: </label>
                        <textarea className="form-control" id="message" name="message"
                                  placeholder="Type your message here..."
                                  defaultValue={this.props.form.message}
                                  onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="recipientEmail">Email address: </label>
                        <input type="email" className="form-control" id="recipientEmail" name="recipientEmail"
                               placeholder="Email Address"
                               defaultValue={this.props.form.recipientEmail}
                               onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                    </div>

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
)(GiftBlock);