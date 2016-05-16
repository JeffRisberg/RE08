import React from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux';

import { queryCategories } from '../actions/categories';

import Category from './Category'

/**
 * Renders a list of category objects, and upon selection, broadcasts to CharityList objects.
 *
 * @author Jeff Risberg
 * @since May 2016
 */
class CategoryList extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.queryCategories();
    }

    render() {
        if (this.props.categories !== undefined) {
            const categoryListId = this.props.blockId;
            const categoryRecords = this.props.categories.idList.map(id => this.props.categories.records[id]);

            var categoryNodes = categoryRecords.map(function (category, index) {
                return (
                    <Category categoryListId={categoryListId} category={category} key={index}></Category>
                );
            });

            return (
                <div>
                    {categoryNodes}
                </div>
            );
        }
        else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    };
};
export default connect(
    mapStateToProps,
    {queryCategories}
)(CategoryList);
