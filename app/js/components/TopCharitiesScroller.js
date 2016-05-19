import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import { getTopCharities } from '../actions/charities';

/**
 * Draws a left-right horizontal scroller of the top charities.
 *
 * @author Jeff Risberg
 * @since April 2016
 */
class TopCharitiesScroller extends React.Component {

    componentDidMount() {
        const blockId = this.props.blockId;

        if (blockId != null && blockId != undefined) {
            this.props.getTopCharities(blockId);
        }
    }

    render() {
        const blockId = this.props.blockId;

        if (blockId != null && blockId != undefined) {
            const charityIds = this.props.charities.idLists[blockId] || [];
            console.log(charityIds);
            const charityRecords = charityIds.map(id => this.props.charities.records[id]);

            const charityNodes =
                charityRecords.map((charity, index) => {
                    var imagePath = '/images/' + charity.logoImage.path;
                    var imageFile = charity.logoImage.fileName;

                    return (
                        <li key={index} className="col-md-2">
                            <img className="thumbnail" src={ imagePath + imageFile} width="128" height="77"/>
                            <br/>
                            <Link to={"/donate/" + charity.ein} className="btn">
                                Donate Now
                            </Link>
                        </li>
                    );
                });

            return (
                <div className="content-region">
                    <div className="content-header">Top Charities</div>

                    <div className="row">
                        <div className="col-md-12">
                            <ul className="horizontal-slide">
                                {charityNodes}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return <div>Missing blockId</div>;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        charities: state.charities
    };
};

export default connect(
    mapStateToProps,
    {getTopCharities}
)(TopCharitiesScroller);
