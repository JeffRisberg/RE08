import React from 'react'

import Block from './Block';

/**
 * Renders a grid of blocks from the portal page data
 *
 * @author Peter Cowan
 * @since May 2016
 */
class BlockGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const blockNodes = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => {
            const rowBlocks = this.props.blocks.filter((block) => (block.row == ("" + index)));
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
        );
    }
}

export default BlockGrid;