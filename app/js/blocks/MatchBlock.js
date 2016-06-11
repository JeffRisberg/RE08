import React, {Component} from 'react'
import { connect } from 'react-redux';

/**
 * Show Matching information for a Donation block
 *
 * @author Jeff Risberg
 * @since May 2016
 */
class MatchBlock extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const amountStr = nextProps.selections['Amount'];

        this.render();
    }

    render() {
        if (this.props.context != null) {

            const matchFrac = parseInt(this.props.block.percent) / 100.0;
            const headerText = this.props.block.headerText;
            const mainText = this.props.block.mainText;

            const amountStr = this.props.selections['Amount'];
            const amount = parseInt(amountStr);
            const amountWithMatch = isNaN(amount) ? "" : ("$" + (amount * (1 + matchFrac)));

            return (
                <div style={{border: '3px solid black', padding: '5px'}}>
                    <b>{headerText}</b>
                    <br/>
                    {mainText}

                    <div style={{fontSize: '15px'}}>
                        <b>{amountWithMatch}</b>
                    </div>

                <span style={{fontSize: '10px'}}>
                    Note:  only your portion of the donation is tax deductable.
                </span>
                </div>
            );
        }
        else {
            return null;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        context: state.context,
        selections: state.selections
    };
};
export default connect(
    mapStateToProps
)(MatchBlock);
