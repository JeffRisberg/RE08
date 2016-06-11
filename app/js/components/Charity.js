import React from 'react'

/**
 * Renders one charity
 *
 * @author Jeff Risberg, Peter Cowan
 * @since March 2016 (Revised May 2016) (Revised June 2016)
 */
class Charity extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const showDetails = (this.props.showDetails === "true");
        const showAddress = (this.props.showAddress === "true");
        const showEin = (this.props.showEin === "true");
        return (
            <p>
                <strong>{this.props.charity.name}</strong>
                <br/>
                {(showDetails || showAddress) ? this.props.charity.city + ', ' +
                this.props.charity.state + ' ' +
                this.props.charity.zip : null}
                <br/>
                {showDetails || showEin ? "Tax ID:" + this.props.charity.ein : null}
            </p>
        )
    }
}

export default Charity;