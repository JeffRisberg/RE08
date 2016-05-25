import React from 'react'
import BlockStateHelper from '../helpers/BlockStateHelper'
import Charity from './Charity'
import CharityList from './CharityList'
import { connect } from 'react-redux';
import { searchCharities, clearSearchResults } from '../actions/charities';
import {REQUEST, SUCCESS, ERROR } from '../constants/StateTypes'

class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            showOptions: false,
            keywords: '',
            zip: '',
            city: '',
            state: '',
            offset: 0,
            limit: 10
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleSearchOptions = this.toggleSearchOptions.bind(this);
    }

    render() {

        var searchOptions = (!this.state.showOptions) ? null
            : (
            <div>
                <p>
                    Zip: <input type="text" name="zip" size="7" value={this.state.zip} onChange={this.handleChange}/>
                </p>

                <p>
                    City: <input type="text" name="city" size="20" value={this.state.city}
                                 onChange={this.handleChange}/> &nbsp;
                    State: <input type="text" name="state" size="20" value={this.state.state}
                                  onChange={this.handleChange}/>
                </p>
            </div>
        );

        var searchBar = (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="keywords" onChange={this.handleChange}/>
                    <input type="submit" value="Go"/>

                    { (this.state.showOptions)
                        ? <p><a href="#" onClick={this.toggleSearchOptions}>Hide search options</a></p>
                        : <p><a href="#" onClick={this.toggleSearchOptions}>Show search options</a></p>}
                    {searchOptions}
                </form>

            </div>
        );

        if (this.props.charityEins == null) {
            const spinner = (this.props.blockState.isLoading()) ? (<div><img src="/resources/images/spinner.gif" alt="&#128336;"/></div>) : null;
            const errorMessage = (this.props.blockState.isError()) ? (<div style={{color: 'red'}}>{this.props.blockState.getErrorMessage()}</div>) : null;
            return (
                <div className="content-region">
                    <div className="content-header">Search for a Charity</div>
                    {searchBar}
                    {spinner}
                    {errorMessage}
                </div>);
        } else {
            console.log('loading? ' + (this.props.blockState.isLoading()))
            let resultsNav = null;
            if (this.props.pagination !== null && this.props.pagination.resultCount > this.props.pagination.resultsPerPage) {

                const previousPage =
                    (this.props.pagination.hasPreviousPage)
                        ? (
                        <li><a href="#" onClick={(e) => {this.handleSearchNav(e, this.props.pagination.previousPage)}}
                               className="resultsNavLink">&laquo;</a></li>)
                        : (<li className="disabled"><a href="#">&laquo;</a></li>)
                const nextPage =
                    (this.props.pagination.hasNextPage)
                        ? (<li><a href="#" onClick={(e) => {this.handleSearchNav(e, this.props.pagination.nextPage)}}
                                  className="resultsNavLink">&raquo;</a></li>)
                        : (<li className="disabled"><a href="#">&raquo;</a></li>)
                const self = this;
                const pages = this.props.pagination.pages.map(function (page, index) {
                    return (page == self.props.pagination.currentPage)
                        ? (<li><a key={index} href="#" className="active" style={{fontWeight: 'bold'}}>{page}</a></li>)
                        : (<li><a key={index} href="#" className="resultsNavLink"
                                  onClick={(e) => {self.handleSearchNav(e, page)}}>{page}</a></li>)
                });

                resultsNav = (<div>
                    <ul className="pagination">
                        {previousPage}
                        {pages}
                        {nextPage}
                    </ul>
                </div>)
            }

            const charityRecords = this.props.charityEins.map(
                (ein) => {
                    return this.props.charities.records[ein];
                });

            const charityResults = (charityRecords.length > 0)
                ? (<CharityList charities={charityRecords}/>)
                : 'No charities found';
            return (
                <div className="content-region">
                    <div className="content-header">Search for a Charity</div>

                    {searchBar}
                    <div>
                        {charityResults}
                    </div>
                    {resultsNav}
                </div>
            );
        }
    }

    handleSubmit(e) {
        this.handleSearchNav(e, 1);
    }

    handleSearchNav(e, page) {
        e.preventDefault();
        const offset = (page - 1) * this.state.limit;
        console.log('setting search offset to ' + offset);

        this.setState({offset: offset}, () => {
            this.handleSearchCharities()
        });
    }

    handleSearchCharities() {
        this.props.searchCharities(this.props.block.name, this.state.keywords, this.state.zip, this.state.city, this.state.state, this.state.offset, this.state.limit)
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    toggleSearchOptions(e) {
        e.preventDefault();
        this.setState({showOptions: !this.state.showOptions});
    }

    componentWillUnmount() {
        this.props.clearSearchResults()
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        charityEins: state.charities.searchResults.charityEins,
        pagination: state.charities.searchResults.pagination,
        blockState: new BlockStateHelper(state.blockStates[ownProps.block.id]),
        charities: state.charities
    };
};
export default connect(
    mapStateToProps,
    {searchCharities, clearSearchResults}
)(Search);
