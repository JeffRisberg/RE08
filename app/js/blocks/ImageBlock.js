import React from 'react'

/**
 * Renders a grid of blocks from the portal page data
 *
 * @author Peter Cowan, Jeff Risberg
 * @since May 2016
 */
class ImageBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const colorClassName = this.props.block.color;
        const locationClassName = this.props.block.location;
        const headerText = this.props.block.headerText;
        const subText = this.props.block.subText;
        const buttonText = this.props.block.buttonText;
        const className = "branding-box " + colorClassName + " " + locationClassName;

        return (
            <div>
                <img src={"" + this.props.block.url} height="250" width="100%"/>
                {(locationClassName !== undefined) ?
                    <div className={className}>

                        <h1 dangerouslySetInnerHTML={{__html: headerText}}></h1>

                        <p dangerouslySetInnerHTML={{__html: subText}}></p>

                        <a href="" className="btn btn-promo" dangerouslySetInnerHTML={{__html: buttonText}}></a>
                    </div>
                    : null}
            </div>
        )
    }
}

export default ImageBlock;