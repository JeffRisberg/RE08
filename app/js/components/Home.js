import React from 'react'
import { Link } from 'react-router'

class Home extends React.Component {

    render() {
        return (
            <div>
                <h2>RE07 Example</h2>

                <div className="row">
                    <div className="col-md-4">
                        Uses React for presentation
                    </div>
                    <div className="col-md-4">
                        Uses socket.io for real-time updates
                    </div>
                    <div className="col-md-4">
                        No database right now
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;