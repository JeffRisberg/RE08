import { SET_PORTAL } from '../constants/ActionTypes'

const portal = (state = [], action = {}) => {
    switch (action.type) {
        case SET_PORTAL:
        {
            var portal = action.portal;
            console.log('portal set: ' + JSON.stringify(portal, null, 2))
            return portal;
        }
        default:
            return state;
    }
};

export default portal;