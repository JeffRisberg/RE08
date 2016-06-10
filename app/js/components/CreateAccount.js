import React from 'react'
import Form from "react-jsonschema-form";
import { connect } from 'react-redux';

import { loginNewAccount, logout } from '../actions/context';

/**
 * The CreateAccount component handles create of a new donor.
 *
 * A jsonSchema form is used for input.
 *
 * @author Peter Cowan
 * @since March 2016
 */
class CreateAccount extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.schema = {
            "title": null,
            "type": "object",
            "required": [
                "login", "firstName", "lastName", "password","confirmPassword"
            ],
            "properties": {
                "login": {
                    "type": "string",
                    "title": "Email Address:"
                },
                "firstName": {
                    "type": "string",
                    "title": "First Name:"
                },
                "lastName": {
                    "type": "string",
                    "title": "Last Name:"
                },
                "password": {
                    "type": "string",
                    "title": "Password:"
                },
                "confirmPassword": {
                    "type": "string",
                    "title": "Confirm Password:"
                }
            }
        };

        this.uiSchema = {
            "password": {
                "ui:widget": "password"
            },
            "confirmPassword": {
                "ui:widget": "password"
            }
        };
    }

    handleSubmit({formData}) {
        this.props.loginNewAccount(formData);
    }

    render() {
            return (
                <div style={{width: '500px'}}>
                    <Form schema={this.schema}
                          uiSchema={this.uiSchema}
                          onSubmit={this.handleSubmit}>
                        <div>
                            <input type="submit" value="Create Account"/>
                        </div>
                    </Form>
                </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        context: state.context
    };
};

export default connect(
    mapStateToProps,
    {loginNewAccount, logout}
)(CreateAccount);
