/**
 * This is used for fetching (paginated) set of charities given a category
 */
import fetch from 'isomorphic-fetch';
import { arrayOf, normalize } from 'normalizr'

import {SET_CURRENT_CATEGORY, SET_CATEGORY_CHARITIES, APPEND_CURRENT_CHARITIES, SET_CHARITY_SEARCH_RESULTS, RESET_CHARITY_SEARCH_RESULTS} from '../constants/ActionTypes'
import { CHARITY_SCHEMA } from '../constants/schemas'

export const queryCategoryCharities = (category) => {
    return function (dispatch) {

        return fetch('/ws/charities/categories/' + category.id, {})
            .then(response => response.json())
            .then((json) => {
                dispatch({
                    type: SET_CURRENT_CATEGORY,
                    category: category
                });

                dispatch({
                    type: APPEND_CURRENT_CHARITIES,
                    charities: normalizeCharities(json.data)
                });
                dispatch({
                    type: SET_CATEGORY_CHARITIES,
                    category: category,
                    charities: json.data
                });
            });
    };
};

const normalizeCharities = (json) => {
    //console.log('charities ' + JSON.stringify(json, null, 2));

    const normalized = normalize({charities: json}, {charities: arrayOf(CHARITY_SCHEMA)});
    //console.log('normalized charities ' + JSON.stringify(normalized, null, 2));

    return normalized.entities.charities;
}

export const queryCharity = (id) => {
    return function (dispatch) {

        return fetch('/ws/charities/' + id, {})
            .then(response => response.json())
            .then((json) => {
                dispatch({
                        type: APPEND_CURRENT_CHARITIES,
                        charities: normalizeCharities([json.data])
                    }
                );
            });
    };
};

export const queryCharityByEin = (ein) => {
    return function (dispatch, getState) {
        if (getState().currentCharities.idList.indexOf(ein) >= 0) {
            return getState().currentCharities.records[ein];
        } else {

            return fetch('/ws/charities/byEin/' + ein, {})
                .then(response => response.json())
                .then((json) => {
                    dispatch({
                            type: APPEND_CURRENT_CHARITIES,
                            charities: normalizeCharities([json.data])
                        }
                    );
                });
        }
    };
};

export const searchCharities = (keywords, zip, city, state, offset, limit) => {
    return function (dispatch) {

        var url = '/ws/charities?keywords=' + keywords + '&zip=' + zip + '&city=' + city + '&state=' + state + '&offset=' + offset + '&limit=' + limit;

        return fetch(url, {})
            .then(response => response.json())
            .then((json) => {
                //console.log('searched charities: ' + JSON.stringify(json.data, null, 2))
                dispatch({
                        type: APPEND_CURRENT_CHARITIES,
                        charities: normalizeCharities(json.data)
                    }
                );
                //console.log('charity search pagination: ' + JSON.stringify(json.pagination, null, 2))
                dispatch({
                        type: SET_CHARITY_SEARCH_RESULTS,
                        charities: json.data,
                        pagination: json.pagination
                    }
                );
            });
    }
};

export const clearSearchResults = () => {
    return {
        type: RESET_CHARITY_SEARCH_RESULTS
    }
};


