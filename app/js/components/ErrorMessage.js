import React from 'react'

import BlockStateHelper from '../helpers/BlockStateHelper'

/**
 * Renders an Error Message from blockState
 *
 * @author Peter Cowan
 * @since May 2016
 */
class ErrorMessage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.blockState.isError()) {

            return (<div style={{color: 'red'}}>{this.props.blockState.getErrorMessage()}</div>)
        }
        return null;
    }
}

export default ErrorMessage;