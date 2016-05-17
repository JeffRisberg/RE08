import React from 'react';
import ReactDOM from 'react-dom';

import CategoryList from './CategoryList'
import CharityList from './CharityList'
import TopCharitiesScroller from './TopCharitiesScroller'

/**
 * @author Jeff Risberg
 * @since May 2016
 */
class Slider extends React.Component {

    render() {
        const block = this.props.block;

        const images = block.images;

        return (
            <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    {images.map((image, index) => {
                        return (
                            <li key={index} data-target="#carousel-example-generic"
                                data-slide-to={{index}}
                                className={index == 0 ? "active" : ""}>
                            </li>
                        )
                    })}
                </ol>

                <div className="carousel-inner" role="listbox">
                    {images.map((image, index) => {
                        const colorClassName = image.color;
                        const locationClassName = image.location;
                        const headerText = image.headerText;
                        const subText = image.subText;
                        const buttonText = image.buttonText;
                        const className = "branding-box " + colorClassName + " " + locationClassName;

                        return (
                            <div key={index} className={index == 0 ? "item active" : "item"}>
                                <img src={image.url} width="100%"/>
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
                    })}
                </div>

                <a className="left carousel-control" href="#carousel-example-generic" role="button"
                   data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href="#carousel-example-generic" role="button"
                   data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}

export default Slider;

