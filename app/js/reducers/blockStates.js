import { SET_BLOCK_STATE } from '../constants/ActionTypes'

const blockStates = (state = [], action = {}) => {
    switch (action.type) {
        case SET_BLOCK_STATE:
        {
            return Object.assign({}, state, { [action.blockId]: {state: action.state, message: action.message} } );
        }
        default:
            return state;
    }
};

export default blockStates;