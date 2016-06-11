import React from 'react'

import CharityItem from './CharityItem'

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
                <CharityItem charity={charity} key={index} showDetails="true"></CharityItem>
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