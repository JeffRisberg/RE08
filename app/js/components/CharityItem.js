import React from 'react'
import { connect } from 'react-redux';

import Charity from './Charity'

import { displayDonate } from '../actions/pageName';

/**
 * Renders one charity in a list is results with a donate now button
 *
 * @author Jeff Risberg, Peter Cowan
 * @since March 2016 (Revised May 2016) (Revised June 2016)
 */
class CharityItem extends React.Component {

    constructor(props) {
        super(props);

        this.handleDonate = this.handleDonate.bind(this);
    }

    handleDonate() {
        this.props.displayDonate(this.props.charity.ein);
    }

    render() {
        return (
            <tr>
                <td>
                    <Charity {...this.props} />
                </td>
                <td style={{textAlign: 'right'}}>
                    <a onClick={() => {this.props.displayDonate(this.props.charity.ein);}} className="btn">Donate Now</a>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = (state) => {
    return {};
};
export default connect(
    mapStateToProps,
    {displayDonate}
)(CharityItem);