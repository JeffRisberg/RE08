import React from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux';

import NavLink from './NavLink'
import { toLogin, logout } from '../actions/context';

/**
 * Appears at top of screen
 *
 * @author Jeff Risberg, Brandon Risberg
 * @since April 30, 2016
 */
class Header extends React.Component {

    render() {
        const vendorName =
            (this.props.context != null && this.props.context.vendor != null) ?
                this.props.context.vendor.name : "";

        var headerText = "Not logged in";
        let loginLogout = <a onClick={this.props.toLogin} style={{marginLeft: '10px'}}>Login</a>;
        if (this.props.context != null && this.props.context.donor != null) {
            var firstName = this.props.context.donor.firstName;
            var lastName = this.props.context.donor.lastName;
            var points = this.props.context.donor.points;

            headerText = firstName + " " + lastName + " " + points + " points";
            loginLogout = <a onClick={this.props.logout} style={{marginLeft: '10px'}}>Logout</a>;
        }

        return (
            <div>
                <div className="row">
                    <div className="container">
                        <div className="logo col-md-8 col-xs-4">
                            <img src="images/RE08Logo.jpg" className="hidden-xs"/>
                            <span style={{marginLeft: '30px', fontSize: '28px'}}>{vendorName}</span>
                        </div>

                        <div className="col-md-4 col-xs-7">
                            <div className="account-header-links text-right hidden-xs">
                                {loginLogout}
                            </div>

                            <div className="account-info text-right">
                                {headerText}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        context: state.context,
    };
};
export default connect(
    mapStateToProps,
    {toLogin, logout}
)(Header);

