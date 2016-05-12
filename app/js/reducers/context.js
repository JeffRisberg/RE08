import { SET_CONTEXT, CLEAR_CONTEXT } from '../constants/ActionTypes'

const context = (state = [], action = {}) => {
  switch (action.type) {
    case SET_CONTEXT:
    {
      var donor = action.context;
      console.log('donor set: ' + JSON.stringify(donor, null, 2))
      return context;
    }
    case CLEAR_CONTEXT:
    {
      return null;
    }
    default:
      return state;
  }
};

export default context;