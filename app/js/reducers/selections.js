import { SET_SELECTION } from '../constants/ActionTypes'

const selection = (state = [], action = {}) => {
    switch (action.type) {
        case SET_SELECTION:
        {
            var name = action.name;
            var value = action.value;
            return state['name'] = value;
        }
        default:
            return state;
    }
};

export default selection;