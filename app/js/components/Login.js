import React from 'react'
import Form from "react-jsonschema-form";
import { connect } from 'react-redux';
import CreateAccount from './CreateAccount'
import ErrorMessage from './ErrorMessage'
import { login, logout,loginNewAccount } from '../actions/context';

/**
 * The login component handles login and logout of a donor.
 *
 * A jsonSchema form is used for input.
 *
 * @author Jeff Risberg, Peter Cowan
 * @since March 2016
 */
class Login extends React.Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);

        this.schema = {
            "title": null,
            "type": "object",
            "required": [
                "login", "password"
            ],
            "properties": {
                "login": {
                    "type": "string",
                    "title": "Username:"
                },
                "password": {
                    "type": "string",
                    "title": "Password:"
                }
            }
        };

        this.uiSchema = {
            "password": {
                "ui:widget": "password"
            }
        };
    }

    handleSubmit({formData}) {
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
                    <ErrorMessage blockState={this.props.blockState}/>

                    <div className="row">
                        <div className="col-md-6">
                            <h2>Returning Donors</h2>

                            <p>Already have an account?</p>

                            <Form schema={this.schema}
                                  uiSchema={this.uiSchema}
                                  onSubmit={this.handleSubmit}>
                                <div>
                                    <input type="submit" value="Login"/>
                                </div>
                            </Form>
                        </div>
                        <div className="col-md-6">
                            <h2>Create a New Account</h2>

                            <p>If you have not yet created an account with us, please do so now.</p>
                            <CreateAccount />
                        </div>
                    </div>
                </div>
            )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        context: state.context,
        blockState: state.blockStates[ownProps.block.id]
    };
};

export default connect(
    mapStateToProps,
    {login, logout}
)(Login);
