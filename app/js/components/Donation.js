import React from 'react';
import ReactDOM from 'react-dom';

/**
 * @author Jeff Risberg
 * @since May 2016
 */
class Donation extends React.Component {
    render() {
        return (
            <tr className="donation">
                <td className="id">
                    {this.props.id}
                </td>
                <td className="date">
                    {this.props.date}
                </td>
                <td className="amount">
                    {this.props.amount}
                </td>
                <td className="status">
                    {this.props.status}
                </td>
            </tr>
        );
    }
}

export default Donation;

