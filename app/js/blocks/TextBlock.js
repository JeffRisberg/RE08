import React from 'react'

import { Link } from 'react-router'

/**
 * Renders a grid of blocks from the portal page data
 *
 * @author Peter Cowan
 * @since May 2016
 */
class TextBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { textBlocks, links }  = this.extractTextAndLinks(this.props.block.text);

        if (!links) {
            console.log(textBlocks[0]);
            return (<div dangerouslySetInnerHTML={{__html: textBlocks[0]}}></div>);
        }

        let output = [];
        for (let i = 0; i < textBlocks.length; i++) {
            console.log(textBlocks[i]);
            output.push((<span dangerouslySetInnerHTML={{__html: textBlocks[i]}}></span>));

            if (i < links.length) {
                var linkItems = links[i].split('|');
                console.log(linkItems[1] + ': ' + linkItems[0]);

                output.push(<Link to={linkItems[1]}>{linkItems[0]}</Link>);
            }
        }
        return (
            <div>{output}</div>);
    }

    extractTextAndLinks(text) {
        console.log('text: ' + text);
        var regex = /\[.*?\]/g;

        var links = text.match(regex);

        if (links) {
            for (let i = 0; i < links.length; i++) {
                links[i] = links[i].replace(/[\[\]]/g, '')
                console.log('link ' + i + ': ' + links[i]);
            }
        }

        var textBlocks = text.split(regex);
        for (let i = 0; i < textBlocks.length; i++) {
            textBlocks[i] = textBlocks[i].replace(/[\[\]]/g, '')
            console.log('textBlock ' + i + ': ' + textBlocks[i]);
        }
        return {
            textBlocks: textBlocks,
            links: links
        }
    }
}


export default TextBlock;