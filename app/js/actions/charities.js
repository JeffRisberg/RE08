/**
 * This is used for fetching (paginated) set of charities given a category
 */
import fetch from 'isomorphic-fetch';

import {APPEND_CHARITIES,
    FETCH_TOP_CHARITIES,
    FETCH_CATEGORY_CHARITIES,
    FETCH_CHARITY_SEARCH_RESULTS, RESET_CHARITY_SEARCH_RESULTS, SET_BLOCK_STATE} from '../constants/ActionTypes'
import {REQUEST, SUCCESS, ERROR} from '../constants/StateTypes'

import { normalizeCharities } from '../constants/schemas'
import { arrayOf, normalize } from 'normalizr'
import {LIST_CHARITY_SCHEMA } from '../constants/schemas'
import {setBlockState } from '../actions/blockStates'

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
        if (getState().charities.idList.indexOf(ein) >= 0) {
            return getState().charities.records[ein];
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

const shouldFetchTopCharities = (state) => {
    return state.topCharities.idList.length == 0;
};

export const getTopCharities = (blockId) => {
    return function (dispatch, getState) {

        if (shouldFetchTopCharities(getState())) {
            dispatch(setBlockState(blockId, REQUEST));

            return fetch('/ws/topCharities', {})
                .then(response => response.json())
                .then((json) => {
                    if (json.status === "success") {
                        const normalizedJson = normalize({listCharities: json.data}, {listCharities: arrayOf(LIST_CHARITY_SCHEMA)});

                        const charitiesMap = normalizedJson.entities.charities;
                        const charities = [];

                        for (let key in charitiesMap) {
                            charities.push(charitiesMap[key]);
                        }

                        dispatch({
                                type: APPEND_CHARITIES,
                                charities: normalizedJson.entities.charities,
                                blockID: blockId
                            }
                        );
                    } else {
                        dispatch(setBlockState(blockId, ERROR, json.messages[0]));
                    }

                    dispatch({
                            type: FETCH_TOP_CHARITIES,
                            topCharities: json.data
                        }
                    );
                    dispatch(setBlockState(blockId, SUCCESS));
                }).catch((error) => {
                    console.log('failed: ' + error)
                    dispatch(setBlockState(blockId, ERROR));
                });

        } else {
            Promise.resolve();
        }
    };
};

export const searchCharities = (blockId, keywords, zip, city, state, offset, limit) => {
    return function (dispatch) {
        dispatch(setBlockState(blockId, REQUEST));
        var url = '/ws/charities?keywords=' + keywords + '&zip=' + zip + '&city=' + city + '&state=' + state + '&offset=' + offset + '&limit=' + limit;

        return fetch(url, {})
            .then(response => response.json())
            .then((json) => {
                if (json.status === "success") {
                    dispatch({
                            type: APPEND_CHARITIES,
                            charities: normalizeCharities(json.data),
                            blockId: blockId
                        }
                    );
                    dispatch({
                            type: FETCH_CHARITY_SEARCH_RESULTS,
                            charities: json.data,
                            pagination: json.pagination
                        }
                    );
                    dispatch(setBlockState(blockId, SUCCESS));
                } else {
                    dispatch(setBlockState(blockId, ERROR, json.messages[0]));
                }
            })
            .catch((error) => {
                console.log('failed: ' + error)
                dispatch(setBlockState(blockId, ERROR));
            });
    }
};

export const clearSearchResults = () => {
    return {
        type: RESET_CHARITY_SEARCH_RESULTS
    }
};


const shouldFetchCategoryCharities = (state, blockId) => {
    return true;
//    var categoryCharities = state.charities.idLists[blockId];
    //  return categoryCharities === undefined || categoryCharities.length == 0;
}

export const fetchCategoryCharities = (blockId, category) => {
    return function (dispatch, getState) {

        if (shouldFetchCategoryCharities(getState(), blockId)) {
            dispatch(setBlockState(blockId, REQUEST));

            return fetch('/ws/charities/categories/' + category.id, {})
                .then(response => response.json())
                .then((json) => {

                    dispatch({
                        type: APPEND_CHARITIES,
                        charities: normalizeCharities(json.data),
                        blockId: blockId
                    });
                    dispatch(setBlockState(blockId, SUCCESS));

                }).catch((error) => {
                    console.log('failed: ' + error);
                    dispatch(setBlockState(blockId, ERROR));

                });
        }
    };
};

