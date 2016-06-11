import React from 'react'

import BlockStateHelper from '../helpers/BlockStateHelper'

/**
 * Renders a Spinner from blockState
 *
 * @author Peter Cowan
 * @since May 2016
 */
class Spinner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('is loading? ' + this.props.blockState.isLoading())
        if (this.props.blockState.isLoading()) {

            return (<div><img src="/resources/images/spinner.gif" alt="&#128336;"/></div>)
        }
        return null;
    }
}

export default Spinner;