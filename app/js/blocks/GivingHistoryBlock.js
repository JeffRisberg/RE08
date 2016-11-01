import React from 'react'
import { connect } from 'react-redux';

import { fetchOrderHistory } from '../actions/orders';
import { addDonationHistory } from '../actions/context';

import BlockStateHelper from '../helpers/BlockStateHelper'
import ErrorMessage from '../components/ErrorMessage'
import GivingHistoryItem from '../components/GivingHistoryItem'
import ResultsNav from '../components/ResultsNav'
import Spinner from '../components/Spinner'

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

function getOrderHistoryPagination(state, year = new Date().getFullYear()) {
    if (state.orders.history[year] !== undefined && state.orders.history[year] != null) {
        var pagination = state.orders.history[year].pagination;
        return pagination;
    }
    return []
}

/**
 * Fetches and renders a donor's giving history
 *
 * @author Jeff Risberg
 * @since March 2016
 */
class GivingHistoryBlock extends React.Component {
    constructor() {
        super();
        this.state = {donationIds: [], year: new Date().getFullYear(), offset: 0, limit: 10};
        this.handleAddCheckedDonations = this.handleAddCheckedDonations.bind(this)
        this.handleFetchOrderHistory = this.handleFetchOrderHistory.bind(this)
    }

    componentDidMount() {
        if (this.props.context != undefined && this.props.context != null &&
            this.props.context.donor != undefined && this.props.context.donor != null) {
            this.props.fetchOrderHistory(this.props.block.id);
        }
    }

    render() {
        if (this.props.context != undefined && this.props.context != null &&
            this.props.context.donor != undefined && this.props.context.donor != null) {

            let checkDonationHandler = (ghInfo) => {
                return this.checkDonation(ghInfo);
            };
            const givingHistoryItemNodes = (this.props.orders === undefined || this.props.orders == null)
                ? null : this.props.orders.map(function (ghInfo, index) {

                const key = "" + ghInfo.orderId + ghInfo.donationId +
                    ghInfo.giftCertificateId + ghInfo.feeId;

                return (
                    <GivingHistoryItem ghInfo={ghInfo} checkDonation={checkDonationHandler}
                                       key={key}>
                    </GivingHistoryItem>
                );
            });

            var currentYear = new Date().getFullYear();
            const selectOptions = [currentYear - 4, currentYear - 3, currentYear - 2, currentYear - 1, currentYear].map((year => {
                return (
                    <option key={"year"+year}>{year}</option>
                )
            }));

            let resultsNav = null;
            if (this.props.pagination != undefined && this.props.pagination !== null && this.props.pagination.resultCount > this.props.pagination.resultsPerPage) {

                resultsNav = (
                    <ResultsNav pagination={this.props.pagination}
                                navigateToPage={(e, page) => {this.handleFetchOrderHistory(e, page)}}/>
                )
            }

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
                        <select onChange={this.handleFetchOrderHistory} name="year" value={this.state.year}>
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
                                <th>Charity/GiftCertificate/Fee</th>
                                <th style={{textAlign: 'right'}}>Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(this.props.blockState.isLoading()) ? <tr>
                                <td><Spinner blockState={this.props.blockState}/></td>
                            </tr> : null}
                            {(this.props.blockState.isError()) ? <tr>
                                <td><ErrorMessage blockState={this.props.blockState}/></td>
                            </tr> : null}
                            {givingHistoryItemNodes}
                            </tbody>
                        </table>
                        {resultsNav}
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

    checkDonation(ghInfo) {
        var index = this.state.donationIds.indexOf(ghInfo.donationId);

        if (this.state.donationIds[index] === undefined) {
            this.state.donationIds.push(ghInfo.donationId);
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

    handleFetchOrderHistory(e, page = 1) {
        e.preventDefault();
        const offset = (page - 1) * this.state.limit;

        this.setState({[e.target.name]: e.target.value, offset: offset}, () => {
            this.props.fetchOrderHistory(this.props.block.id, this.state.year, this.state.offset, this.state.limit);
        });
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        year: ownProps.year,
        context: state.context,
        orders: filterOrderHistory(state, ownProps.year),
        pagination: getOrderHistoryPagination(state, ownProps.year),
        blockState: new BlockStateHelper(state.blockStates[ownProps.block.id])
    };
};

export default connect(
    mapStateToProps,
    {fetchOrderHistory, addDonationHistory}
)(GivingHistoryBlock);
