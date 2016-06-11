import React from 'react'
import { connect } from 'react-redux';

import Header from './Header'
import BlockGrid from './BlockGrid';
import Footer from './Footer'

import { fetchPortal, getPageBlocks } from '../actions/portal';
import { setPage } from '../actions/pageName'
import { fetchContext } from '../actions/context';

/**
 * @author Jeff Risberg
 * @since April 2016
 */
class AppRoot extends React.Component {

    componentDidMount() {
        console.log('this.props.params.pageName: ' + this.props.params.pageName);
        this.props.setPage(this.props.params.pageName);
        if (this.props.portal === undefined || this.props.portal == null
            || this.props.vendor === undefined || this.props.vendor == null) {
            this.props.fetchContext();
            this.props.fetchPortal()
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps.params.pageName: ' + nextProps.params.pageName);
        this.props.setPage(nextProps.params.pageName);
    }

    render() {
        if (this.props.portal === undefined || this.props.portal == null
            || this.props.vendor === undefined || this.props.vendor == null) {
            return null;
        }

        var currentLocation = this.props.location.pathname;

        const blocks = getPageBlocks(this.props.portal, this.props.pageName);

        return (
            <div className="container-fluid">
                <Header currentLocation={currentLocation}/>

                <div className="container" style={{minHeight: '400px'}}>
                    <BlockGrid blocks={blocks}/>
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
        pageName: (state.pageName) ? state.pageName : 'Landing',
        portal: state.portal,
        vendor: state.vendor
    };
};

export default connect(
    mapStateToProps,
    {fetchContext, fetchPortal, setPage}
)(AppRoot);

