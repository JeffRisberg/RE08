import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import Header from './Header'
import Footer from './Footer'

import { fetchContext } from '../actions/context';
import { fetchPortal } from '../actions/portal';
import { fetchVendor } from '../actions/vendor';

/**
 * @author Jeff Risberg
 * @since April 2016
 */
class AppRoot extends React.Component {

    componentDidMount() {
        const pathName = window.location.pathname.substring(1);

        if (this.props.portal === undefined || this.props.portal == null
            || this.props.vendor === undefined || this.props.vendor == null) {
            this.props.fetchContext(pathName).then(() => {
                    this.props.fetchVendor();
                    this.props.fetchPortal();
                }
            )
        }
    }

    render() {
        if (this.props.portal === undefined || this.props.portal == null
            || this.props.vendor === undefined || this.props.vendor == null) {
            return null;
        }

        var currentLocation = this.props.location.pathname;

        return (
            <div className="container-fluid">
                <Header currentLocation={currentLocation}/>

                <div className="container" style={{minHeight: '400px'}}>
                    {this.props.children}
                </div>

                <div className="container">
                    <Footer/>
                </div>
            </div>
        )
    }
}

AppRoot.contextTypes = {
    location: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        portal: state.portal,
        vendor: state.vendor
    };
};

export default connect(
    mapStateToProps,
    {fetchContext, fetchVendor, fetchPortal}
)(AppRoot);

