import { SET_PAGE_NAME } from '../constants/ActionTypes'

const pageName = (state = [], action = {}) => {
    switch (action.type) {
        case SET_PAGE_NAME:
        {
            var pageName = action.name;
            return pageName;
        }
        default:
            return state;
    }
};

export default pageName;