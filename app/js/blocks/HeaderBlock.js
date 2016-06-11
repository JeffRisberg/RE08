import React from 'react'

/**
 * The HeadeBlock component displays a title and description
 *
 * @author Peter Cowan
 * @since June 2016
 */
class HeaderBlock extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let headerText;

        switch (this.props.block.size) {
            case '1':
            {
                headerText = (<h1 dangerouslySetInnerHTML={{__html: this.props.block.headerText}}></h1>)
                break;
            }
            case '3':
            {
                headerText = (<h3 dangerouslySetInnerHTML={{__html: this.props.block.headerText}}></h3>)
                break;
            }
            case '4':
            {
                headerText = (<h4 dangerouslySetInnerHTML={{__html: this.props.block.headerText}}></h4>)
                break;
            }
            case '5':
            {
                headerText = (<h5 dangerouslySetInnerHTML={{__html: this.props.block.headerText}}></h5>)
                break;
            }
            case '6':
            {
                headerText = (<h6 dangerouslySetInnerHTML={{__html: this.props.block.headerText}}></h6>)
                break;
            }
            default:
            {
                headerText = (<h2 dangerouslySetInnerHTML={{__html: this.props.block.headerText}}></h2>)
            }
        }
        return (
            <div>
                {headerText}
                <p dangerouslySetInnerHTML={{__html: this.props.block.subHeaderText}}></p>
            </div>
        )
    }
}

export default HeaderBlock;