import React from 'react'

/**
 * Renders one fundraiser
 *
 * @author Jeff Risberg
 * @since August 2016
 */
class Fundraiser extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <p>
                <strong>{this.props.fundraiser.name}</strong>
            </p>
        )
    }
}

export default Fundraiser;