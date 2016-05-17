import fetch from 'isomorphic-fetch';

import { SET_CATEGORIES, SET_SELECTION } from '../constants/ActionTypes'

const shouldFetchCategories = (state) => {
    return state.categories == null;
}

export const queryCategories = (blockId) => {

    return function (dispatch, getState) {

        if (shouldFetchCategories(getState())) {

            return fetch('/ws/categories/guide', {})
                .then(response => response.json())
                .then((json) => {
                    const categories = json.data;
                    const firstCategory = categories[0];

                    dispatch({
                        type: SET_SELECTION,
                        name: blockId,
                        value: firstCategory
                    });

                    dispatch({
                        type: SET_CATEGORIES,
                        categories: json.data
                    });
                });
        } else {
            Promise.resolve();

            // We don't need to fetch categories, but we must check that first category is selected for this block
            const currentCategory = getState().selections[blockId];
            if (currentCategory == null || currentCategory == undefined) {
                const firstCategory = getState().categories[0];

                dispatch({
                    type: SET_SELECTION,
                    name: blockId,
                    value: firstCategory
                });
            }
        }
    }
};

