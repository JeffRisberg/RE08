import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';

import { Link } from 'react-router'
import Block from './Block';

/**
 * @author Jeffrey Risberg
 * @since May 2016
 */
class Home extends React.Component {

    render() {
        const headerImageName = this.props.portal[0].headerImage;
        const headerSrc = "images/" + headerImageName + ".jpg";

        const blocks = this.props.portal[0].blocks.map((block, index) => {
            return (
                <div key={index} className="col-md-4">
                    <Block block={block}/>
                </div>
            )
        })

        return (
            <div>
                <div>
                    <img src={headerSrc} width="100%"/>
                </div>
                <div className="content-region">
                    <div className="row">
                        {blocks}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        portal: state.portal
    };
};
export default connect(
    mapStateToProps
)(Home);

