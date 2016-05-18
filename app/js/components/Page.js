import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';

import { Link } from 'react-router'
import Block from './Block';

/**
 * Renders the blocks in a page.
 *
 * @author Jeffrey Risberg
 * @since May 2016
 */
class Page extends React.Component {

    render() {
        const pageName = this.props.pageName;
        const blocks = this.props.portal.pages[pageName].blocks;

        const blockNodes = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => {
            const rowBlocks = blocks.filter((block) => (block.row == ("" + index)));
            if (rowBlocks.length > 0) {
                return (
                    <div key={index} className="row">
                        {rowBlocks.map((block, index) => {
                            const theClass = "col-md-" + block.width;
                            return <div key={index} className={theClass}>
                                <Block key={index} block={block}/>
                            </div>
                        })}
                    </div>
                );
            }
            else
                return null;
        });

        return (
            <div className="content-region">
                {blockNodes}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pageName: state.pageName,
        portal: state.portal
    };
};
export default connect(
    mapStateToProps
)(Page);

