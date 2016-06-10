import { SET_PORTAL } from '../constants/ActionTypes'

const portal = (state = [], action = {}) => {
    switch (action.type) {
        case SET_PORTAL:
        {
            return action.portal;
        }
        default:
            return state;
    }
};

export default portal;