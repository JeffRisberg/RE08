import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

/**
 * @author Jeff Risberg
 * @since May 2016
 */
class Header extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div style={{width: '600px', background: '#ddd'}}>
                Header
            </div>
        );
    }
}

export default Header;