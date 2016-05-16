import React from 'react'
import { Link } from 'react-router'

/**
 * Render one category
 *
 * @author Peter Cowan, Jeff Risberg
 * @since April 2016
 */
class Category extends React.Component {
    constructor() {
        super();

        this.selectCategory = this.selectCategory.bind(this);
    }

    selectCategory() {
        this.props.setSelection(this.props.categoryListId, this.props.category.id);
    }

    render() {
        if (this.props.active) {
            return (
                <div style={{padding: '2', background: 'black', color: 'white'}} onClick={this.selectCategory}>
                    <strong>{this.props.category.name}</strong>
                </div>
            )
        }
        else {
            return (
                <div style={{padding: '2'}} onClick={this.selectCategory}>
                    <strong>{this.props.category.name}</strong>
                </div>
            )
        }
    }
}

export default Category;