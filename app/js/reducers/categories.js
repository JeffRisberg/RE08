import { FETCH_CATEGORIES, FETCH_CATEGORY_CHARITIES } from '../constants/ActionTypes'

const categories = (state = [], action = {}) => {
    switch (action.type) {
        case FETCH_CATEGORIES:
        {
            const records = [];

            action.categories.forEach(record => {
                records.push(record);
            });

            return records;
        }
        case FETCH_CATEGORY_CHARITIES:
        {
            const categoryId = action.category.id;
            if (state.idList.indexOf(categoryId) < 0) return state;

            const category = state.records[categoryId];

            const categoryCharityEins = action.charities.map((charity) => {
                return charity.ein
            });
            //console.log('setting category ' + JSON.stringify(state.records[categoryId], null, 2));

            const updatedState = Object.assign({}, state);
            Object.assign(updatedState.records[categoryId], {charities: categoryCharityEins});
            Object.assign(updatedState.selected, {loading: false});

            return updatedState;
        }
        default:
            return state;
    }
};

export default categories;