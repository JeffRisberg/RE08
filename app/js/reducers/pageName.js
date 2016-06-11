import { SET_PAGE_NAME } from '../constants/ActionTypes'

const pageName = (state = [], action = {}) => {
    switch (action.type) {
        case SET_PAGE_NAME:
        {
            console.log('setting page name: ' + action.pageName)
            return action.pageName;
        }
        default:
            return state;
    }
};

export default pageName;