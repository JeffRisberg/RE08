import React from 'react'
import { ERROR } from '../constants/StateTypes'

/**
 * Renders an Error Message from blockState
 *
 * @author Peter Cowan
 * @since May 2016
 */
class ErrorMessage extends React.Component {

    render() {
        if (this.props.blockState && this.props.blockState.state === ERROR && this.props.blockState.message != null) {

            return (<div style={{color: 'red'}}>{this.props.blockState.message}</div>)
        }
        return null;
    }
}

export default ErrorMessage;