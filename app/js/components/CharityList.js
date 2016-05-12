import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { getCharities } from '../actions/currentCharities';

import Charity from './Charity';

/**
 * @author Jeff Risberg
 * @since May 2016
 */
class CharityList extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this.props.getCharities();
    }

    render() {
        let charitys = this.props.charities.map((charity, index) => {
            return (
                <Charity key={index}
                           id={charity.id}
                           date={charity.date}
                           amount={charity.amount}
                           status={charity.status}/>
            )
        });

        return (
            <div className="charityList">
                <h1>Charitys</h1>

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
                    {charitys}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        charities: state.charities
    };
};

export default connect(
    mapStateToProps,
    {getCharities}
)(CharityList);
