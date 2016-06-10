import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';

import { setForm, handleFormFieldChange, clearForm } from '../actions/forms';
import { checkout } from '../actions/context';

const formName = 'checkoutForm';

/**
 * Fetches Basket contents and renders a checkout screen
 *
 * @author Peter Cowan, Jeff Risberg
 * @since April 2016
 */
class CreditCardForm extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setForm(formName)
    }

    componentWillUnmount() {
        this.props.clearForm(formName)
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => {this.props.checkout(e, this.props.form)}}>
                    <div className="form-group">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input type="cardNumber" className="form-control" id="cardNumber" name="cardNumber" placeholder="Card Number" onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>

                        <p className="help-block">Example block-level help text here.</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="cvCode">CV Code</label>
                        <input type="password" className="form-control" id="cvCode" name="cvCode" placeholder="CV Code" onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="expMonth">Expiration Month</label>
                        <input type="number" className="form-control" id="expMonth" name="expMonth" placeholder="Expiration Month" onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="expYear">Expiration Year</label>
                        <input type="number" className="form-control" id="expYear" name="expYear" placeholder="Expiration Year" onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                    </div>

                    <input type="submit" value="Checkout"/>
                </form>
            </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        donor: state.context,
        order: state.orders.records[state.context.orderId],
        form: state.forms[formName]
    };
};
export default connect(
    mapStateToProps,
    {setForm, handleFormFieldChange, clearForm, checkout}
)(CreditCardForm);
