import React from 'react'

import BlockStateHelper from '../helpers/BlockStateHelper'
import CharityList from '../components/CharityList'
import ErrorMessage from '../components/ErrorMessage'
import ResultsNav from '../components/ResultsNav'
import Spinner from '../components/Spinner'

import { connect } from 'react-redux';
import { searchCharities, clearSearchResults } from '../actions/charities';
import { setForm, handleFormFieldChange, clearForm, submitForm, setFormField } from '../actions/forms';

const formName = 'searchForm';

class SearchBlock extends React.Component {
    constructor(props) {
        super(props);

        this.formData = {
            showOptions: false,
            keywords: '',
            zip: '',
            city: '',
            state: '',
            offset: 0,
            limit: 10
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchNav = this.handleSearchNav.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleSearchOptions = this.toggleSearchOptions.bind(this);
    }

    componentDidMount() {
        this.props.setForm(formName, this.formData)
    }

    componentWillUnmount() {
        this.props.clearForm(formName);
        this.props.clearSearchResults()
    }

    render() {

        var searchOptions = (this.props.form && !this.props.form.showOptions) ? null
            : (
            <div>
                <div className="form-group">
                    <label htmlFor="zip">Zip:</label>
                    <input type="zip" className="form-control" id="zip" name="zip" placeholder="Zip Code"
                           onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                </div>

                <div className="form-group">
                    <label htmlFor="city">Zip:</label>
                    <input type="city" className="form-control" id="city" name="city" placeholder="City"
                           onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/> &nbsp;
                    <label htmlFor="state">State:</label>
                    <input type="state" className="form-control" id="state" name="state" placeholder="State"
                           onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                </div>
            </div>
        );

        var searchBar = (
            <div>
                <form onSubmit={(e) => {this.props.submitForm(e, formName, this.handleSearch)}}>
                    <div className="form-group">
                        <input type="keywords" className="form-control" id="keywords" name="keywords" placeholder="Search charities..."
                               onChange={(e) => {this.props.handleFormFieldChange(formName, e)}}/>
                    </div>

                    <input type="submit" value="Go"/>

                    { (this.props.form && this.props.form.showOptions)
                        ? <p><a href="#" onClick={this.toggleSearchOptions}>Hide search options</a></p>
                        : <p><a href="#" onClick={this.toggleSearchOptions}>Show search options</a></p>}
                    {searchOptions}
                </form>

            </div>
        );

        if (this.props.charityEins == null) {
            return (
                <div className="content-region">
                    <div className="content-header" dangerouslySetInnerHTML={{__html: this.props.block.headerText}}></div>
                    {searchBar}
                    <Spinner blockState={this.props.blockState}/>
                    <ErrorMessage blockState={this.props.blockState}/>
                </div>);
        } else {
            let resultsNav = null;
            if (this.props.pagination !== null && this.props.pagination.resultCount > this.props.pagination.resultsPerPage) {

                resultsNav = (<ResultsNav pagination={this.props.pagination} navigateToPage={(e, page) => {this.handleSearchNav(e, page)}}/>)
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
                        <Spinner blockState={this.props.blockState}/>
                        {charityResults}
                    </div>
                    {resultsNav}
                </div>
            );
        }
    }

    handleSubmit(e) {
        this.props.submitForm(e, formName, (formData) => { this.handleSearch(formData, 1)})
    }

    handleSearch(formData, page = 1) {
        const offset = (page - 1) * formData.limit;
        console.log('setting search offset to ' + offset);

        this.props.setFormField(formName, 'offset', offset);
        this.props.searchCharities(this.props.block.id, formData.keywords, formData.zip, formData.city, formData.state, formData.offset, formData.limit)
    }

    handleSearchNav(e, page) {
        this.props.submitForm(e, formName, (formData) => { this.handleSearch(formData, page)})
    }

    toggleSearchOptions(e) {
        e.preventDefault();
        this.props.setFormField(formName, 'showOptions', !this.props.form.showOptions);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        form: state.forms[formName],
        charityEins: state.charities.searchResults.charityEins,
        pagination: state.charities.searchResults.pagination,
        blockState: new BlockStateHelper(state.blockStates[ownProps.block.id]),
        charities: state.charities
    };
};

export default connect(
    mapStateToProps,
    {searchCharities, clearSearchResults, setForm, handleFormFieldChange, clearForm, submitForm, setFormField}
)(SearchBlock);
