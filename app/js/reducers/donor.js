import { SET_DONOR, CLEAR_DONOR } from '../constants/ActionTypes'

const donor = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DONOR:
    {
      var donor = action.donor;
      return donor;
    }
    case CLEAR_DONOR:
    {
      return null;
    }
    default:
      return state;
  }
};

export default donor;