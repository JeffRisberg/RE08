import { SET_VENDOR } from '../constants/ActionTypes'

const vendor = (state = [], action = {}) => {
    switch (action.type) {
        case SET_VENDOR:
        {
            var vendor = action.vendor;
            console.log('vendor set: ' + JSON.stringify(vendor, null, 2))
            return vendor;
        }
        default:
            return state;
    }
};

export default vendor;