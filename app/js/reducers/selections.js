import { SET_SELECTION } from '../constants/ActionTypes'

const selection = (state = [], action = {}) => {
    switch (action.type) {
        case SET_SELECTION:
        {
            console.log('setting selection ' + action.name + ' to ' + action.value)

            return Object.assign({}, state, { [action.name]: action.value} );
        }
        default:
            return state;
    }
};

export default selection;