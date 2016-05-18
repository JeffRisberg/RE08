import { SET_PAGE_NAME } from '../constants/ActionTypes'

export const setPageName = (pageName) => {

    return function (dispatch, getState) {

        dispatch({
                type: SET_PAGE_NAME,
                pageName: pageName
            }
        );
    };
};