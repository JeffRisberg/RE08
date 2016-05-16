import fetch from 'isomorphic-fetch';

import { SET_CATEGORIES } from '../constants/ActionTypes'

import { queryCategoryCharities } from '../actions/currentCharities';

const shouldFetchCategories = (state) => {
    return state.categories.idList.length == 0;
}

export const queryCategories = () => {

    return function (dispatch, getState) {

        if (shouldFetchCategories(getState())) {

            return fetch('/ws/categories/guide', {})
                .then(response => response.json())
                .then((json) => {
                    const categories = json.data;

                    dispatch({
                        type: SET_CATEGORIES,
                        categories: json.data
                    });

                    //dispatch(queryCategoryCharities(firstCategory));
                });
        } else {
            Promise.resolve();
        }
    }
};
