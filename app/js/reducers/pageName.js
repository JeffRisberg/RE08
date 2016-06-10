import { SET_PAGE_NAME } from '../constants/ActionTypes'

const pageName = (state = [], action = {}) => {
    switch (action.type) {
        case SET_PAGE_NAME:
        {
            return action.pageName;
        }
        default:
            return state;
    }
};

export default pageName;