import { FETCH_TOP_CHARITIES_REQUEST, FETCH_TOP_CHARITIES, FETCH_TOP_CHARITIES_ERROR} from '../constants/ActionTypes'

const topCharities = (state = [], action = {}) => {
  switch (action.type) {
    case FETCH_TOP_CHARITIES_REQUEST: //
    {
      const updatedState = Object.assign({}, state);
      Object.assign(updatedState, {loading: true});

      return updatedState;
    }
    case FETCH_TOP_CHARITIES:
    {
      const idList = [];
      const records = {};

      action.topCharities.forEach(record => {
        records[record.id] = record;
        idList.push(record.id);
      });

      return {idList, records};
    }
    case FETCH_TOP_CHARITIES_ERROR:
    {
      return Object.assign({}, state, {error: action.error, loading: false});
    }
    default:
      return state;
  }
};

export default topCharities;