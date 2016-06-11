import React from 'react'
import { connect } from 'react-redux';

import BlockStateHelper from '../helpers/BlockStateHelper'
import ErrorMessage from '../components/ErrorMessage'

import { loginNewAccount, logout } from '../actions/context';
import { setForm, handleFormFieldChange, clearForm, submitForm } from '../actions/forms';

const formName = 'newAccountForm';

/**
 * The CreateAccountBlock component handles create of a new donor.
 *
 * A jsonSchema form is used for input.
 *
 * @author Peter Cowan
 * @since March 2016
 */
class CreateAccountBlock extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.setForm(formName, {})
    }

    componentWillUnmount() {
        this.props.clearForm(formName)
    }


    handleSubmit(formData) {
        this.props.loginNewAccount(this.props.block.id, formData);
    }

    render() {
        return (
            <div style={{width: '500px'}}>
                <h2 dangerouslySetInnerHTML={{__html: this.props.block.headerText}}></h2>

                <p dangerouslySetInnerHTML={{__html: this.props.block.subHeaderText}}></p>

                <ErrorMessage blockState={this.props.blockState}/>

                <form onSubmit={(e) => {this.props.submitForm(e, formName, this.handleSubmit)}}>
                    <div className="form-group">
                        <label htmlFor="login">Email Address:*</label>
                        <input type="login" className="form-control" id="login" name="login" placeholder="Email Address"
                               onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="firstName">First Name:*</label>
                        <input type="firstName" className="form-control" id="firstName" name="firstName" placeholder="First Name"
                               onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:*</label>
                        <input type="lastName" className="form-control" id="lastName" name="lastName" placeholder="Last Name"
                               onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:*</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password"
                               onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:*</label>
                        <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password"
                               onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Account"/>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        form: state.forms[formName],
        context: state.context,
        blockState: new BlockStateHelper(state.blockStates[ownProps.block.id])
    };
};

export default connect(
    mapStateToProps,
    {loginNewAccount, logout, setForm, handleFormFieldChange, clearForm, submitForm}
)(CreateAccountBlock);
