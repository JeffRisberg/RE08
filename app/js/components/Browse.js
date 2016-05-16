import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';

import { queryCategories } from '../actions/categories';
import { queryCategoryCharities } from '../actions/currentCharities';

import Category from './Category'
import Charity from './Charity'
import CharityList from './CharityList'

/**
 * Renders a category list on the left, and a set of charities for the selected category on
 * the right.
 *
 * @author Jeff Risberg, Peter Cowan
 * @since April 2016
 */
class Browse extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.queryCategories();
    }

    render() {
        const selectedCategoryId = (this.props.categories.selected === null || !this.props.categories.selected) ? 1 : this.props.categories.selected;
        const categoryRecords = this.props.categories.idList.map(id => this.props.categories.records[id]);
        const loadCharitiesHandler = (category) => {
            return this.props.queryCategoryCharities(category);
        };

        const categoryNodes = categoryRecords.map(function (category, index) {
            return (
                <Category category={category}
                          active={category.id == selectedCategoryId}
                          loadCharities={loadCharitiesHandler}
                          key={index}>
                </Category>
            );
        });

        //console.log('selected category id ' + selectedCategoryId)

        const selectedCategory = this.props.categories.records[selectedCategoryId];
        const charityRecords = (selectedCategoryId === null ||
                                this.props.categories.idList.length <= 0 ||
                                selectedCategory === undefined ||
                                selectedCategory.charities === undefined)
            ? []
            : selectedCategory.charities.map(id => this.props.currentCharities.records[id]);

        //console.log('charity records ' + JSON.stringify(this.props.currentCharities.records, null, 2));
        if (selectedCategory && selectedCategory.charities) {
            //console.log('category charities ' + JSON.stringify(selectedCategory.charities, null, 2));
        }
        //console.log('category charity records ' + JSON.stringify(charityRecords, null, 2));
        const charityList = (charityRecords.length > 0) ? (<CharityList charities={charityRecords}/>) : null;

        const charityListHeader = (selectedCategoryId != null && selectedCategory !== undefined)
            ? <div><h3>Displaying charities for {selectedCategory.name}</h3></div>
            : null;

        return (
            <div className="content-region">
                <div className="content-header">Find a Charity by Cause</div>

                <div className="row">
                    <div className="col-md-2">
                        {categoryNodes}
                    </div>
                    <div className="col-md-10">
                        <div>{charityListHeader}</div>
                        {charityList}
                    </div>
                </div>
            </div>
        )
    }
}

Browse.propTypes = {
    categories: PropTypes.object.isRequired,
    currentCharities: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        currentCharities: state.currentCharities
    };
};
export default connect(
    mapStateToProps,
    {queryCategories, queryCategoryCharities}
)(Browse);
