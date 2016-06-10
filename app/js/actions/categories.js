import fetch from 'isomorphic-fetch';

import { FETCH_CATEGORIES, SET_SELECTION, SET_BLOCK_STATE}
        from '../constants/ActionTypes'
import {REQUEST, SUCCESS, ERROR} from '../constants/StateTypes'

import { normalizeCharities } from '../constants/schemas'
import { fetchCategoryCharities } from '../actions/charities';
import {setBlockState } from '../actions/blockStates'
import { setSelection } from '../actions/selections';

const shouldFetchCategories = (state) => {
    return state.categories == null || state.categories == undefined || state.categories.length == 0;
};

export const fetchCategories = (blockId) => {

    return function (dispatch, getState) {

        if (shouldFetchCategories(getState())) {

            dispatch(setBlockState(blockId, REQUEST));

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
                        type: FETCH_CATEGORIES,
                        categories: json.data
                    });
                    dispatch(setBlockState(blockId, SUCCESS));

                    dispatch(fetchCategoryCharities(blockId, firstCategory));
                }).catch((error) => {
                    console.log('failed: ' + error)
                    dispatch(setBlockState(blockId, ERROR));
                });

        } else {
            Promise.resolve();
        }
    }
};
