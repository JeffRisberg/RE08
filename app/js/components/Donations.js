import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { removeDonation } from '../actions/context';
import { displayUpdateDonation } from '../actions/pageName';
import Donation from './Donation';

/**
 * Shows the donor's current basket contents
 *
 * @author Jeff Risberg
 * @since March 2016
 */
class Donations extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const donations = this.props.order.donations;

    console.log('this.props.displayButtons: ' + this.props.displayButtons)
    if (donations != null && donations != undefined && donations.length > 0) {
      let self = this;
      const donationNodes = donations.map(function (donation) {
        return (
          <div className="row">
            <div className="col-md-8">
              <Donation donation={donation} key={donation.id} showCharityAddress={self.props.showCharityAddress}
                showCharityEin={self.props.showCharityEin}></Donation>
            </div>
            {(self.props.displayButtons === "true") ?
              <div className="col-md-4" style={{ textAlign: 'right' }}>

                <button onClick={ () => {
                  self.props.displayUpdateDonation(donation)
                }}>Update Donation
                </button>

                <button onClick={ () => {
                  self.props.removeDonation(donation.id)
                }}>Remove Donation
                </button>
              </div>
              : null}
          </div>
        );
      });

      return (<div>{donationNodes}</div>);
    } else {
      return null;
    }

  }
}

Donations.propTypes = {
  displayButtons: PropTypes.bool,
  showCharityAddress: PropTypes.bool,
  showCharityEin: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  return {};
};

export default connect(
  mapStateToProps,
  { removeDonation, displayUpdateDonation }
)(Donations);
