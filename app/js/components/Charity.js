import React from 'react'

import { connect } from 'react-redux';

import { displayDonate } from '../actions/pageName';

/**
 * Renders one charity
 *
 * @author Jeff Risberg
 * @since March 2016 (Revised May 2016)
 */
class Charity extends React.Component {

    constructor() {
        super();

        this.handleDonate = this.handleDonate.bind(this);
    }

    handleDonate() {
        this.props.displayDonate(this.props.charity.ein);
    }

    render() {
        return (
            <tr>
                <td><p>
                    <strong>{this.props.charity.name}</strong>
                    <br/>
                    {this.props.charity.city},&nbsp;
                    {this.props.charity.state}&nbsp;
                    {this.props.charity.zip}
                    <br/>
                    Tax ID: {this.props.charity.ein}
                </p></td>
                <td style={{textAlign: 'right'}}>
                    <a onClick={this.handleDonate} className="btn">Donate Now</a>
                </td>
            </tr>
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
)(Charity);