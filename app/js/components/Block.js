import React from 'react';
import ReactDOM from 'react-dom';

/**
 * @author Jeff Risberg
 * @since May 2016
 */
class Block extends React.Component {

    render() {
        console.log("block!");
        const block = this.props.block;
        const blockType = block.type;
        console.log(blockType);

        if (blockType === 'text') {
            return (
                <div dangerouslySetInnerHTML={{__html: block.text}}>
                </div>
            )
        }
        if (blockType === 'image') {
            return (
                <div>
                    <img src={block.url}/>
                </div>
            )
        }
    }
}

export default Block;

