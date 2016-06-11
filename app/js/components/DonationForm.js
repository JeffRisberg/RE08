import React from 'react'
import { connect } from 'react-redux';

import { setForm, handleFormFieldChange, clearForm } from '../actions/forms';

const formName = 'donateForm';

/**
 * Donation form using redux-form
 *
 * @author Jeff Risberg, Peter Cowan, Brandon Risberg
 * @since May 2016
 */
class DonationForm extends React.Component {
    constructor(props) {
        super(props);

        this.amountChanged = this.amountChanged.bind(this);
    }

    componentDidMount() {
        this.props.setForm(formName, this.props.formData)
    }

    componentWillUnmount() {
        this.props.clearForm(formName)
    }

    amountChanged() {
        this.props.amountChanged("Amount", this.props.form.amount);
    }

    render() {
        const charity = this.props.charity;

        if (this.props.form != null && this.props.form !== undefined && charity !== null && charity !== undefined) {
            const instructionalText = this.props.block.instructionalText;
            const recurringDonation = this.props.block.recurringDonation !== undefined && this.props.block.recurringDonation == "true";
            const shareName = this.props.block.shareName !== undefined && this.props.block.shareName == "true";
            const shareAddress = this.props.block.shareAddress !== undefined && this.props.block.shareAddress == "true";
            const shareEmail = this.props.block.shareEmail !== undefined && this.props.block.shareEmail == "true";

            const recurringDonationNode =
                (recurringDonation ?
                    (<p>
                            <input type="checkbox" name="isRecurring"/>
                            Make this a recurring donation
                        </p>
                    ) : null);

            const shareNameNode =
                (shareName ?
                    ( <span style={{fontSize: '14px', paddingRight: '20px'}}>
                                <input type="checkbox" name="shareName" defaultChecked={this.props.form.shareName}
                                       onChange={(e) => {console.log('shareName value: ' + this.props.form.shareName); this.props.handleFormFieldChange(formName, e)}}/>{' '}
                            <label htmlFor="shareName">Name</label>

                            </span>
                    ) : null);

            const shareAddressNode =
                (shareAddress ?
                    ( <span style={{fontSize: '14px', paddingRight: '20px'}}>
                                <input type="checkbox" name="shareAddress" defaultChecked={this.props.form.shareAddress}
                                       onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>{' '}
                            <label htmlFor="shareAddress">Address</label>
                            </span>
                    ) : null);

            const shareEmailNode =
                (shareEmail ?
                    ( <span style={{fontSize: '14px', paddingRight: '20px'}}>
                                <input type="checkbox" name="shareEmail" defaultChecked={this.props.form.shareEmail}
                                       onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>{' '}
                            <label htmlFor="shareEmail">Name</label>
                            </span>
                    ) : null);

            return (
                <div>
                    <h3 style={{marginTop: '0px'}}>{charity.name}</h3>

                    <p>
                        {charity.addressLine1}
                        <br/>
                        {charity.city}, {charity.state} {charity.zip}
                        <br/>
                    </p>

                    <form onSubmit={(e) => {this.props.handleSubmit(e, this.props.form)}}>
                        <div className="form-group">
                            <label htmlFor="amount">{instructionalText}</label><br />
                            <input type="text" className="form-control" id="amount" name="amount" value={this.props.form.amount}
                                   onChange={(e) => {this.props.handleFormFieldChange(formName, e); this.amountChanged()}}/>
                        </div>

                        {recurringDonationNode}

                        <p>Share My:</p>

                        <div className="form-group">
                            {shareNameNode}
                            {shareAddressNode}
                            {shareEmailNode}
                        </div>

                        <div className="form-group">
                            <label htmlFor="designation">Designation</label><br />
                            <input type="text" className="form-control" id="designation" name="designation" defaultValue={this.props.form.designation}
                                   onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                        </div>

                        <p>Dedicate my donation to a friend of loved one:</p>

                        <div className="form-group">
                            <label htmlFor="giftName">In the name of:</label><br />
                            <input type="text" className="form-control" id="giftName" name="giftName" defaultValue={this.props.form.giftName}
                                   onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="memorialName">In memory of:</label><br />
                            <input type="text" className="form-control" id="memorialName" name="memorialName" defaultValue={this.props.form.memorialName}
                                   onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                        </div>

                        <div className="pull-right">
                            <input type="submit" value="Continue" className="btn btn-default"/>
                        </div>
                    </form>
                </div>
            );
        }
        else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        form: state.forms[formName]
    };
};
export default connect(
    mapStateToProps,
    {setForm, handleFormFieldChange, clearForm}
)(DonationForm);
