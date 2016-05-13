import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';

import { Link } from 'react-router'
import Block from './Block';

/**
 * @author Jeffrey Risberg
 * @since May 2016
 */
class Home extends React.Component {

    render() {
        const blocks = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => {
            const rowBlocks = this.props.portal[0].blocks.filter((block) => (block.row == ("" + index)));
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
                {blocks}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        portal: state.portal
    };
};
export default connect(
    mapStateToProps
)(Home);

