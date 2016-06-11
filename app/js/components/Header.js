import React from 'react'

import { connect } from 'react-redux';

import { login, logout } from '../actions/context';
import { displayLogin, displayBasket, displayGivingHistory, displayLanding } from '../actions/pageName';

/**
 * Appears at top of screen
 *
 * @author Jeff Risberg, Brandon Risberg
 * @since April 30. 2016
 */
class Header extends React.Component {

    render() {
        var headerText = "Not logged in";
        let loginLogout = <a onClick={this.props.displayLogin} style={{marginLeft: '10px'}}>Login</a>;
        if (this.props.context != null && this.props.context.donor != null) {
            var firstName = this.props.context.donor.firstName;
            var lastName = this.props.context.donor.lastName;

            headerText = "Hello, " + firstName + " " + lastName;
            loginLogout = <a onClick={this.props.logout} style={{marginLeft: '10px'}}>Logout</a>;
        }

        return (
            <div>
                <div className="header row white">
                    <div className="top-border"></div>
                    <div className="container">
                        <div className="logo col-md-4 col-xs-4">
                            <a onClick={this.props.displayLanding} style={{marginLeft: '10px'}}>
                                <img src="images/RE08Logo.jpg" className="hidden-xs"/>
                            </a>
                        </div>

                        <div className="col-md-8 col-xs-7">
                            <div className="account-header-links text-right hidden-xs">
                                {loginLogout}
                            </div>

                            <div className="account-info text-right">
                                {headerText}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row darkgrey">
                    <div className="container" style={{height: '5px'}}>
                    </div>
                </div>

                <div className="row" style={{marginBottom: '2px'}}>
                    <div className="container">
                        <div className="col-md-9" style={{paddingTop: '15px'}}>
                        </div>
                        <div className="col-md-3" style={{textAlign: 'right'}}>
                            <a onClick={this.props.displayBasket} style={{marginLeft: '10px'}}><div className="basket"/></a>
                            <a onClick={this.props.displayGivingHistory} style={{marginLeft: '10px'}}><div className="giving-history"/></a>
                        </div>
                    </div>
                </div>

                <div id="sessionExpiredModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content">
                            <div className="modal-header" style={{color: 'white', background: '#AE2573'}}>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title" style={{textAlign: 'center'}}>Attention</h4>
                            </div>
                            <div className="modal-body">
                                <p>Your session will end soon and you will be Signed Off. Would you like to continue
                                    your session?</p>
                            </div>
                            <div className="modal-footer" style={{textAlign: 'center'}}>
                                <button type="button" className="btn btn-default" data-dismiss="modal"
                                        style={{color: 'white', background: '#AE2573'}}>
                                    Continue
                                </button>
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
        context: state.context
    };
};
export default connect(
    mapStateToProps,
    {logout, displayLogin, displayBasket, displayGivingHistory, displayLanding}
)(Header);

