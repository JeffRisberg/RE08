import { SET_SELECTION } from '../constants/ActionTypes'

const selection = (state = [], action = {}) => {
    switch (action.type) {
        case SET_SELECTION:
        {
            return Object.assign({}, state, { [action.name]: action.value} );
        }
        default:
            return state;
    }
};

export default selection;