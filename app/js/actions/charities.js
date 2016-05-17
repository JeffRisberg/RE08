/**
 * This is used for fetching (paginated) set of charities based on a blockId
 */
import fetch from 'isomorphic-fetch';
import { arrayOf, normalize } from 'normalizr'

import { SET_TOP_CHARITIES, APPEND_CURRENT_CHARITIES } from '../constants/ActionTypes'

import { SET_CHARITIES, FETCH_CHARITY_SEARCH_RESULTS_SUCCESS, RESET_CHARITY_SEARCH_RESULTS, FETCH_CHARITY_SEARCH_RESULTS_REQUEST, FETCH_CHARITY_SEARCH_RESULTS_ERROR} from '../constants/ActionTypes'
import { CHARITY_SCHEMA, LIST_CHARITY_SCHEMA } from '../constants/schemas'

const normalizeCharities = (json) => {
    //console.log('charities ' + JSON.stringify(json, null, 2));

    const normalized = normalize({charities: json}, {charities: arrayOf(CHARITY_SCHEMA)});
    //console.log('normalized charities ' + JSON.stringify(normalized, null, 2));

    return normalized.entities.charities;
}

const shouldFetchTopCharities = (blockId, state) => {
    return state.charities.idLists[blockId] == null || state.charities.idLists[blockId].length == 0;
};

export const queryCategoryCharities = (category, blockId) => {
    return function (dispatch) {

        return fetch('/ws/charities/categories/' + category.id, {})
            .then(response => response.json())
            .then((json) => {

                dispatch({
                    type: SET_CHARITIES,
                    blockId: blockId,
                    charities: json.data
                });
            });
    };
};

export const getTopCharities = (blockId) => {
    return function (dispatch, getState) {

        if (shouldFetchTopCharities(blockId, getState())) {

            return fetch('/ws/topCharities', {})
                .then(response => response.json())
                .then((json) => {

                    dispatch({
                            type: SET_CHARITIES,
                            blockId: blockId,
                            charities: json.data
                        }
                    );
                });

        } else {
            Promise.resolve();
        }
    };
};

export const queryCharity = (id) => {
    return function (dispatch) {

        return fetch('/ws/charities/' + id, {})
            .then(response => response.json())
            .then((json) => {
                dispatch({
                        type: APPEND_CHARITIES,
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
                            type: APPEND_CHARITIES,
                            charities: normalizeCharities([json.data])
                        }
                    );
                });
        }

    };
};

export const searchCharities = (keywords, zip, city, state, offset, limit) => {
    return function (dispatch) {
        dispatch({
                type: FETCH_CHARITY_SEARCH_RESULTS_REQUEST
            }
        );

        var url = '/ws/charities?keywords=' + keywords + '&zip=' + zip + '&city=' + city + '&state=' + state + '&offset=' + offset + '&limit=' + limit;

        return fetch(url, {})
            .then(response => response.json())
            .then((json) => {
                //console.log('searched charities: ' + JSON.stringify(json.data, null, 2))
                dispatch({
                        type: APPEND_CHARITIES,
                        charities: normalizeCharities(json.data)
                    }
                );
                //console.log('charity search pagination: ' + JSON.stringify(json.pagination, null, 2))
                dispatch({
                        type: FETCH_CHARITY_SEARCH_RESULTS_SUCCESS,
                        charities: json.data,
                        pagination: json.pagination
                    }
                );
            })
            .catch((error) => {
                console.log('failed: ' + error)
                dispatch({
                        type: FETCH_CHARITY_SEARCH_RESULTS_ERROR,
                        error: 'Error searching : ' + error
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


