import React from 'react'

import { connect } from 'react-redux';

import { fetchCategories } from '../actions/categories';
import { setSelection } from '../actions/selections';

import Category from '../components/Category'

/**
 * Renders a list of category objects, and upon selection, broadcasts to selections.
 *
 * @author Jeffrey Risberg
 * @since May 2016
 */
class CategoryListBlock extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const blockId = this.props.block.id;

        if (blockId != null && blockId != undefined) {
            this.props.fetchCategories(blockId);
        }
    }

    selectCategory(category) {
        const blockId = this.props.block.id;

        this.props.setSelection(blockId, category);
    }

    render() {
        const blockId = this.props.block.id;

        if (blockId != null && blockId != undefined) {
            var selectedValue = this.props.selections[blockId];

            if (this.props.categories != null) {
                if (selectedValue == null) {
                    selectedValue = this.props.categories[0];
                }

                var categoryNodes = this.props.categories.map((category, index) => {
                    return (
                        <Category key={index} category={category} active={category.name == selectedValue.name}
                                  onClick={this.selectCategory.bind(this, category)}>
                        </Category>
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
        else {
            return <div>Missing blockId</div>;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        selections: state.selections
    };
};
export default connect(
    mapStateToProps,
    {fetchCategories, setSelection}
)(CategoryListBlock);
