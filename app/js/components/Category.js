import React from 'react'
import { Link } from 'react-router'

/**
 * Render one category
 *
 * @author Jeff Risberg
 * @since April 2016
 */
class Category extends React.Component {
    constructor() {
        super();
    }

    render() {
        if (this.props.active) {
            return (
                <div style={{padding: '2', background: 'black', color: 'white'}} onClick={this.props.onClick}>
                    <strong>{this.props.category.name}</strong>
                </div>
            )
        }
        else {
            return (
                <div style={{padding: '2'}} onClick={this.props.onClick}>
                    <strong>{this.props.category.name}</strong>
                </div>
            )
        }
    }
}

export default Category;