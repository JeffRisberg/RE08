import React from 'react'
import { connect } from 'react-redux';

import { queryOrderHistory } from '../actions/orders';
import { addDonationHistory } from '../actions/context';

import GivingHistoryItem from './GivingHistoryItem'

function filterOrderHistory(state, year = new Date().getFullYear()) {
    if (state.orders.history[year] !== undefined && state.orders.history[year] != null) {
        return state.orders.history[year].idList.map((id) => {
            if (state.orders.records[id]) {
                return state.orders.records[id];
            }
        });
    }
    return []
}

/**
 * Fetches and renders a donor's giving history
 *
 * @author Jeff Risberg
 * @since March 2016
 */
class GivingHistory extends React.Component {
    constructor() {
        super();
        this.state = {donationIds: [], year: new Date().getFullYear()};
        this.handleAddCheckedDonations = this.handleAddCheckedDonations.bind(this)
        this.selectYear = this.selectYear.bind(this)
    }

    componentDidMount() {
        if (this.props.context != undefined && this.props.context != null) {
            this.props.queryOrderHistory(this.props.context);
        }
    }

    render() {
        if (this.props.context != undefined && this.props.context != null &&
            this.props.context.donor != undefined && this.props.context.donor != null) {

            let checkDonationHandler = (donation) => {
                return this.checkDonation(donation);
            };
            const givingHistoryItemNodes = (this.props.orders === undefined || this.props.orders == null)
                ? null : this.props.orders.map(function (order, index) {

                return order.donations.map((donation) => {
                    return (
                        <GivingHistoryItem order={order} donation={donation} checkDonation={checkDonationHandler}
                                           key={order.id + '' + donation.id}>
                        </GivingHistoryItem>
                    );
                })
            });

            var currentYear = new Date().getFullYear();
            const selectOptions = [currentYear - 4, currentYear - 3, currentYear - 2, currentYear - 1, currentYear].map((year => {
                let selected = (year == this.state.year) ? "selected" : '';
                return (<option selected={selected}>{year}</option>)
            }));

            return (
                <div className="content-region">
                    <div className="content-header">Giving History</div>

                    <p>
                        Below is a history of your past donations.
                    </p>

                    <p>
                        To donate again to a charity click on the charity name. Or to repeat
                        the same donation, check the box next to the charity(ies), then
                        click the "Add Selected Donation(s) to Basket" button.
                    </p>

                    <p>TIP: for a detailed history of your donations for your tax records,
                        go to <a>Account Activity</a>.
                    </p>

                    <div style={{marginBottom: '15px'}}>
                        <select onChange={this.selectYear} name="year">
                            {selectOptions}
                        </select>
                    </div>

                    <form onSubmit={this.handleAddCheckedDonations}>
                        <table className="table">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Date</th>
                                <th>Transaction #</th>
                                <th>Charity</th>
                                <th>Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {givingHistoryItemNodes}
                            </tbody>
                        </table>
                        <br/> <input type="submit" value="Add Checked Items to Giving Basket"/>
                    </form>
                </div>
            );
        }
        else {
            return (
                <div className="content-region">
                    <div className="content-header">Please log in first to view Giving History</div>
                </div>
            )
        }
    }

    checkDonation(donationId) {
        var index = this.state.donationIds.indexOf(donationId);

        if (this.state.donationIds[index] === undefined) {
            this.state.donationIds.push(donationId);
        }
        else {
            if (index > -1) {
                this.state.donationIds.splice(index, 1);
            }
        }
    }

    handleAddCheckedDonations(e) {
        e.preventDefault();
        if (this.state.donationIds.length > 0) {
            this.props.addDonationHistory(this.state.donationIds);
        }
    }

    selectYear(e) {
        this.setState({[e.target.name]: e.target.value}, () => {
            this.props.queryOrderHistory(this.props.context, this.state.year);
        });
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        year: ownProps.year,
        context: state.context,
        orders: filterOrderHistory(state, ownProps.year)
    };
};

export default connect(
    mapStateToProps,
    {queryOrderHistory, addDonationHistory}
)(GivingHistory);
