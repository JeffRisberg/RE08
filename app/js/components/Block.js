import React from 'react';
import ReactDOM from 'react-dom';

import Login from './Login'
import Slider from './Slider'
import CategoryList from './CategoryList'
import CategoryCharities from './CategoryCharities'
import TopCharitiesScroller from './TopCharitiesScroller'
import Search from './Search'
import Donate from './Donate'
import Match from './Match'

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
                    <img src={"/resources"+block.url} height="250" width="100%"/>
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
                <Login block={block}/>
            )
        }
        if (blockType === 'slider') {
            return (
                <Slider block={block}/>
            )
        }
        if (blockType === 'categories') {
            return (
                <CategoryList block={block}/>
            )
        }
        if (blockType === 'charities') {
            return (
                <CategoryCharities block={block}/>
            )
        }
        if (blockType === 'topCharities') {
            return (
                <TopCharitiesScroller block={block}/>
            )
        }
        if (blockType === 'searchCharities') {
            return (
                <Search block={block}/>
            )
        }
        if (blockType === 'donate') {
            return (
                <Donate block={block}/>
            )
        }
        if (blockType === 'match') {
            return (
                <Match block={block}/>
            )
        }
    }
}

export default Block;

