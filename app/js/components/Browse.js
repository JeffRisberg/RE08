import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';

import { fetchCategories } from '../actions/categories';
import { fetchCategoryCharities } from '../actions/charities';

import CategoryList from './CategoryList'
import CategoryCharities from './CategoryCharities'

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
        this.props.fetchCategories();
    }

    render() {
        const selectedCategory = (this.props.categories.selected === undefined || this.props.categories.selected.id == null) ? null : this.props.categories.records[this.props.categories.selected.id];

        return (
            <div className="content-region">
                <div className="content-header">Find a Charity by Cause</div>

                <div className="row">
                    <div className="col-md-2">
                        <CategoryList categories={this.props.categories}
                                    selectedCategory={selectedCategory}
                                    clickCategoryHandler={(category) => {this.props.fetchCategoryCharities(category)}}/>
                    </div>
                    <div className="col-md-10">
                        <CategoryCharities category={selectedCategory}
                                           categories={this.props.categories}
                                           charities={this.props.charities} />
                    </div>
                </div>
            </div>
        )
    }
}

Browse.propTypes = {
    categories: PropTypes.object.isRequired,
    charities: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        charities: state.charities
    };
};
export default connect(
    mapStateToProps,
    {fetchCategories, fetchCategoryCharities}
)(Browse);
