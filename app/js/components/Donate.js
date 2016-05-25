import React from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { addDonation } from '../actions/context';
import { setSelection } from '../actions/selections';

/**
 * Revised Donation screen (after May21)
 *
 * @author Jeff Risberg, Peter Cowan, Brandon Risberg
 * @since May 2016
 */
class NDonate extends React.Component {
    constructor() {
        super();

        this.amountKeyPress = this.amountKeyPress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.setSelection("Amount", "");
    }

    amountKeyPress(event) {
        const amountStr = ReactDOM.findDOMNode(this.refs.amount).value.trim() + event.key;

        this.props.setSelection("Amount", amountStr);
    }

    handleSubmit(e) {
        e.preventDefault();

        const amountStr = ReactDOM.findDOMNode(this.refs.amount).value.trim();

        const recurringNode = ReactDOM.findDOMNode(this.refs.recurring);
        const recurring = (recurringNode != null) ? recurrentNode.value.trim() : null;

        const shareNameNode = ReactDOM.findDOMNode(this.refs.shareName);
        const shareName = (shareNameNode != null) ? shareNameNode.checked : false;

        const shareAddressNode = ReactDOM.findDOMNode(this.refs.shareAddress);
        const shareAddress = (shareAddressNode != null) ? shareAddressNode.checked : false;

        const shareEmailNode = ReactDOM.findDOMNode(this.refs.shareEmail);
        const shareEmail = (shareEmailNode != null) ? shareEmailNode.checked : false;

        const designation = ReactDOM.findDOMNode(this.refs.designation).value.trim();

        var formData = {
            "amount": amountStr, "shareName": shareName, "shareEmail": shareEmail,
            "shareAddress": shareAddress, "designation": designation, "giftName": "", "memorialName": ""
        };
        const ein = this.props.selections['ein'];

        this.props.addDonation(formData, ein);
    }

    render() {
        if (this.props.context != null && this.props.context.donor != null) {

            const ein = this.props.selections['ein'];
            const charity = this.props.charities.records[ein];

            if (charity !== null && charity !== undefined) {
                const instructionalText = this.props.block.instructionalText;
                const recurringDonation =
                    this.props.block.recurringDonation !== undefined && this.props.block.recurringDonation == "true";
                const shareName =
                    this.props.block.shareName !== undefined && this.props.block.shareName == "true";
                const shareAddress =
                    this.props.block.shareAddress !== undefined && this.props.block.shareAddress == "true";
                const shareEmail =
                    this.props.block.shareEmail !== undefined && this.props.block.shareEmail == "true";

                const recurringDonationNode =
                    (recurringDonation ?
                        (<tr>
                                <td></td>
                                <td>
                                    <input type="checkbox" ref="recurring"/>
                                    Make this a recurring donation
                                </td>
                            </tr>
                        ) : null);
                const shareNameNode =
                    (shareName ?
                        ( <span style={{fontSize: '14px', paddingRight: '20px'}}>
                                <input type="checkbox" ref="shareName"/>{' '}Name
                            </span>
                        ) : null);
                const shareAddressNode =
                    (shareAddress ?
                        ( <span style={{fontSize: '14px', paddingRight: '20px'}}>
                                <input type="checkbox" ref="shareAddress"/>{' '}Address
                            </span>
                        ) : null);
                const shareEmailNode =
                    (shareEmail ?
                        ( <span style={{fontSize: '14px', paddingRight: '20px'}}>
                                <input type="checkbox" ref="shareEmail"/>{' '}Email
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

                        <form onSubmit={this.handleSubmit}>
                            <p>{instructionalText}</p>

                            <p>
                                <input type="text" ref="amount" size="10" onKeyPress={this.amountKeyPress}/>
                            </p>

                            {recurringDonationNode}

                            <p>Share My:</p>

                            <p>
                                {shareNameNode}
                                {shareAddressNode}
                                {shareEmailNode}
                            </p>

                            <p>Designation:</p>

                            <p>
                                <input type="text" ref="designation" size="40"/>
                            </p>

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
        else {
            return (
                <div>
                    <p>Please log in first to make a donation.</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        context: state.context,
        charities: state.charities,
        selections: state.selections
    };
};
export default connect(
    mapStateToProps,
    {setSelection, addDonation}
)(NDonate);
