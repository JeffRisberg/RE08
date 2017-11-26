import React from 'react'
import { connect } from 'react-redux';

import BlockStateHelper from '../helpers/BlockStateHelper'
import ErrorMessage from '../components/ErrorMessage'
import { login, logout,loginNewAccount } from '../actions/context';
import { setForm, handleFormFieldChange, clearForm, submitForm } from '../actions/forms';

const formName = 'loginForm';

/**
 * The login component handles login and logout of a donor.
 *
 * @author Jeff Risberg, Peter Cowan
 * @since May 2016
 */
class LoginBlock extends React.Component {

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

        var loginValue = formData.login.trim();
        var password = formData.password.trim();

        this.props.login(this.props.block.id, loginValue, password);
    }

    render() {
        if (this.props.context.donor != undefined && this.props.context.donor != null)
            return (
                <div>
                    <p>
                        You are logged in as {this.props.context.donor.firstName} {this.props.context.lastName}
                    </p>
                    <button onClick={() => {this.props.logout()}}>Logout</button>
                </div>
            );
        else
            return (
                <div>
                    <h2 dangerouslySetInnerHTML={{__html: this.props.block.headerText}}></h2>

                    <p dangerouslySetInnerHTML={{__html: this.props.block.subHeaderText}}></p>

                    <ErrorMessage blockState={this.props.blockState}/>

                    <form onSubmit={(e) => {this.props.submitForm(e, formName, this.handleSubmit)}}>
                        <div className="form-group">
                            <label htmlFor="login">Username:*</label>
                            <input type="login" className="form-control" id="login" name="login" placeholder="Email Address"
                                   onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:*</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="Password"
                                   onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Login"/>
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
    {login, logout, setForm, handleFormFieldChange, clearForm, submitForm}
)(LoginBlock);
