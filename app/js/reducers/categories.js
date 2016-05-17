import { SET_CATEGORIES } from '../constants/ActionTypes'

const categories = (state = [], action = {}) => {
    switch (action.type) {
        case SET_CATEGORIES: // clear prior categories
        {
            const records = [];

            action.categories.forEach(record => {
                records.push(record);
            });

            return records;
        }
        default:
            return state;
    }
};

export default categories;