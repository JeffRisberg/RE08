import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { getDonations } from '../actions/donations';

import Donation from './Donation';

/**
 * @author Jeff Risberg
 * @since May 2016
 */
class DonationList extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this.props.getDonations();
    }

    render() {
        let donations = this.props.donations.map((donation, index) => {
            return (
                <Donation key={index}
                           id={donation.id}
                           date={donation.date}
                           amount={donation.amount}
                           status={donation.status}/>
            )
        });

        return (
            <div className="donationList">
                <h1>Donations</h1>

                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {donations}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        donations: state.donations
    };
};

export default connect(
    mapStateToProps,
    {getDonations}
)(DonationList);

