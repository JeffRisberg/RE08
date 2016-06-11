import { SET_CONTEXT, CLEAR_CONTEXT } from '../constants/ActionTypes'

const context = (state = [], action = {}) => {
  switch (action.type) {
    case SET_CONTEXT:
    {
      var context = action.context;
      console.log('context set: ' + JSON.stringify(context, null, 2))
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