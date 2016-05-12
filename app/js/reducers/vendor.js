import { SET_VENDOR } from '../constants/ActionTypes'

const vendor = (state = [], action = {}) => {
    switch (action.type) {
        case SET_VENDOR:
        {
            var vendor = action.vendor;
            return vendor;
        }
        default:
            return state;
    }
};

export default vendor;