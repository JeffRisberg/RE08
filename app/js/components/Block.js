import React from 'react';
import ReactDOM from 'react-dom';

import BasketBlock from '../blocks/BasketBlock'
import CreateAccountBlock from '../blocks/CreateAccountBlock'
import CreditCardFormBlock from '../blocks/CreditCardFormBlock'
import CategoryListBlock from '../blocks/CategoryListBlock'
import CategoryCharitiesBlock from '../blocks/CategoryCharitiesBlock'
import ConfirmationBlock from '../blocks/ConfirmationBlock'
import DonateBlock from '../blocks/DonateBlock'
import GiftBlock from '../blocks/GiftBlock'
import GivingHistoryBlock from '../blocks/GivingHistoryBlock'
import HeaderBlock from '../blocks/HeaderBlock'
import ImageBlock from '../blocks/ImageBlock'
import LoginBlock from '../blocks/LoginBlock'
import MatchBlock from '../blocks/MatchBlock'
import SearchBlock from '../blocks/SearchBlock'
import SliderBlock from '../blocks/SliderBlock'
import TextBlock from '../blocks/TextBlock'
import TopCharitiesScrollerBlock from '../blocks/TopCharitiesScrollerBlock'

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

        if (blockType === 'givingBasket') {
            return (
                <BasketBlock block={block}/>
            )
        }
        if (blockType === 'createAccount') {
            return (
                <CreateAccountBlock block={block}/>
            )
        }
        if (blockType === 'creditCardForm') {
            return (
                <CreditCardFormBlock block={block}/>
            )
        }
        if (blockType === 'categories') {
            return (
                <CategoryListBlock block={block}/>
            )
        }
        if (blockType === 'charities') {
            return (
                <CategoryCharitiesBlock block={block}/>
            )
        }
        if (blockType === 'confirmation') {
            return (
                <ConfirmationBlock block={block}/>
            )
        }
        if (blockType === 'donate') {
            return (
                <DonateBlock block={block}/>
            )
        }
        if (blockType === 'gift') {
            return (
                <GiftBlock block={block}/>
            )
        }
        if (blockType === 'givingHistory') {
            return (
                <GivingHistoryBlock block={block}/>
            )
        }
        if (blockType === 'headerBlock') {
            return (
                <HeaderBlock block={block}/>
            );
        }
        if (blockType === 'hr') {
            return (
                <hr/>
            )
        }
        if (blockType === 'image') {
            return (
                <ImageBlock block={block}/>
            );
        }
        if (blockType === 'login') {
            return (
                <LoginBlock block={block}/>
            )
        }
        if (blockType === 'match') {
            return (
                <MatchBlock block={block}/>
            )
        }
        if (blockType === 'searchCharities') {
            return (
                <SearchBlock block={block}/>
            )
        }
        if (blockType === 'slider') {
            return (
                <SliderBlock block={block}/>
            )
        }
        if (blockType === 'text') {
            return (
                <TextBlock block={block}/>
            );
        }
        if (blockType === 'topCharities') {
            return (
                <TopCharitiesScrollerBlock block={block}/>
            )
        }
        return null;
    }
}

export default Block;

