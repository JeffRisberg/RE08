import { FETCH_FUNDRAISERS} from '../constants/ActionTypes'

const fundraisers = (state = [], action = {}) => {
  switch (action.type) {
    case FETCH_FUNDRAISERS: //
    {
      const updatedState = Object.assign({}, state);
      Object.assign(updatedState, {loading: true});

      return updatedState;
    }

    default:
      return state;
  }
};

export default fundraisers;