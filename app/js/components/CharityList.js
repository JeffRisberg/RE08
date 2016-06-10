import React from 'react'

import Charity from './Charity'

/**
 * Renders a list of charity objects
 *
 * @author Jeff Risberg
 * @since March 2016
 */
class CharityList extends React.Component {
    constructor() {
        super();
    }

    render() {
        var charityNodes = this.props.charities.map(function (charity, index) {
            return (
                <Charity charity={charity} key={index}></Charity>
            );
        });

        return (
                <table className="table">
                <tbody>
                {charityNodes}
                </tbody>
            </table>
        );
    }
}

export default CharityList;