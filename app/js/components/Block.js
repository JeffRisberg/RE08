import React from 'react';
import ReactDOM from 'react-dom';

import Login from './Login'
import Slider from './Slider'
import CategoryList from './CategoryList'
import CategoryCharities from './CategoryCharities'
import TopCharitiesScroller from './TopCharitiesScroller'

/**
 * Renders one block in a page.
 *
 * @author Jeff Risberg
 * @since May 2016
 */
class Block extends React.Component {

    render() {
        const block = this.props.block;
        const blockType = block.type;

        if (blockType === 'hr') {
            return (
                <hr/>
            )
        }
        if (blockType === 'text') {
            return (
                <div dangerouslySetInnerHTML={{__html: block.text}}>
                </div>
            )
        }
        if (blockType === 'image') {
            const colorClassName = block.color;
            const locationClassName = block.location;
            const headerText = block.headerText;
            const subText = block.subText;
            const buttonText = block.buttonText;
            const className = "branding-box " + colorClassName + " " + locationClassName;

            return (
                <div>
                    <img src={block.url} height="250" width="100%"/>
                    {(locationClassName !== undefined) ?
                        <div className={className}>

                            <h1 dangerouslySetInnerHTML={{__html: headerText}}>
                            </h1>

                            <p dangerouslySetInnerHTML={{__html: subText}}>
                            </p>
                            <a href="" className="btn btn-promo"
                               dangerouslySetInnerHTML={{__html: buttonText}}>
                            </a>
                        </div>
                        : null}
                </div>
            )
        }
        if (blockType === 'login') {
            return (
                <Login blockId={block.blockId}/>
            )
        }
        if (blockType === 'slider') {
            return (
                <Slider blockId={block.blockId}/>
            )
        }
        if (blockType === 'categories') {
            return (
                <CategoryList blockId={block.blockId}/>
            )
        }
        if (blockType === 'charities') {
            return (
                <CategoryCharities blockId={block.blockId} categorySourceId={block.categorySourceId}/>
            )
        }
        if (blockType === 'topCharities') {
            return (
                <TopCharitiesScroller blockId={block.blockId}/>
            )
        }
    }
}

export default Block;

