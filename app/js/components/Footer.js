import React from 'react'
import { Link } from 'react-router'

/**
 * Appears at bottom of screen
 *
 * @author Jeff Risberg, Brandon Risberg
 * @since April 30, 2016
 */
class Footer extends React.Component {
    render() {
        return (
            <div>
                <div className="footer" style={{marginLeft: '+15px', marginRight: '+15px'}}>
                    <div className="row darkgrey footer-links">
                        <div className="col-md-6 text-left">
                            Left
                        </div>
                        <div className="col-md-6 text-right">
                            Right
                        </div>
                    </div>
                    <div className="row dark-gray copyright">
                        <div className="col-md-12 text-right">
                            Portal Example
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;
