import React from 'react'

import { connect } from 'react-redux';

import { displayDonate } from '../actions/pageName';

/**
 * Renders one list charity, which is what is returned from the TopCharities fetch.
 *
 * @author Jeff Risberg
 * @since March 2016
 */
class ListCharity extends React.Component {

    constructor() {
        super();

        this.handleDonate = this.handleDonate.bind(this);
    }

    handleDonate() {
        this.props.displayDonate(this.props.listCharity.charity.ein);
    }

    render() {
        const imagePath = '/images/' + this.props.listCharity.logoImage.path;
        const imageFile = this.props.listCharity.logoImage.fileName;

        return (
            <li key={this.props.index} className="col-md-2">
                <img className="thumbnail" style={{marginBottom: '0px'}}
                     src={imagePath + imageFile} width="128" height="77"/>
                <br/>
                <a onClick={this.handleDonate} className="btn">Donate Now</a>
            </li>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    };
};
export default connect(
    mapStateToProps,
    {displayDonate}
)(ListCharity);