import { SET_CATEGORIES, SET_CATEGORY_CHARITIES, SET_CURRENT_CATEGORY } from '../constants/ActionTypes'

const categories = (state = [], action = {}) => {
    switch (action.type) {
        case SET_CATEGORIES: // clear prior categories
        {
            const idList = [];
            const records = {};

            action.categories.forEach(record => {
                records[record.id] = record;
                idList.push(record.id);
            });

            return {idList, records};
        }
        case SET_CATEGORY_CHARITIES: //
        {
            const categoryId = action.category.id;
            console.log('categoryId ' + categoryId);
            if (state.idList.indexOf(categoryId) < 0) return state;

            const category = state.records[categoryId];
            console.log('category ' + JSON.stringify(category, null, 2));

            const categoryCharities = action.charities.map((charity) => {
                return charity.ein
            });
            console.log('categoryCharities ' + JSON.stringify(categoryCharities));

            console.log('category ' + JSON.stringify(state.records[categoryId], null, 2));

            const updatedState = Object.assign({}, state);
            Object.assign(updatedState.records[categoryId], {charities: categoryCharities});

            console.log('updatedCategory ' + JSON.stringify(updatedState.records[categoryId], null, 2));
            console.log('updatedState ' + JSON.stringify(updatedState, null, 2));

            return updatedState;
        }
        case SET_CURRENT_CATEGORY:
        {
            const categoryId = action.category.id;
            if (state.idList.indexOf(categoryId) < 0) return state;

            const currentCategory = state.records[categoryId];

            return Object.assign({}, state, {selected: action.category.id});
        }
        default:
            return state;
    }
};

export default categories;