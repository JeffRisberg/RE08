import { SET_CURRENT_CHARITIES, APPEND_CURRENT_CHARITIES, FETCH_CHARITY_SEARCH_RESULTS_SUCCESS, RESET_CHARITY_SEARCH_RESULTS, FETCH_CHARITY_SEARCH_RESULTS_REQUEST, FETCH_CHARITY_SEARCH_RESULTS_ERROR } from '../constants/ActionTypes'

const currentCharities = (state = [], action = {}) => {
    switch (action.type) {
        case SET_CURRENT_CHARITIES: // clear prior charities
        {
            const idList = [];
            const records = {};

            action.charities.forEach(record => {
                records[record.ein] = record;
                idList.push(record.ein);
            });

            return {idList, records};
        }
        case APPEND_CURRENT_CHARITIES:
        {
            const updatedState = Object.assign({}, state);

            for (let key in action.charities) {
                let charity = action.charities[key];

                console.log('charity ' + JSON.stringify(charity, null, 2))
                const ein = charity.ein;

                if (updatedState.idList.indexOf(ein) < 0) {
                    updatedState.idList.push(ein);
                    console.log('added ' + ein + ' to currentCharities.idList')
                }
                updatedState.records[ein] = charity;
            }
            return updatedState;
        }
        case FETCH_CHARITY_SEARCH_RESULTS_REQUEST:
        {
            return Object.assign({}, state, {searchResults: {loading: true}});
        }
        case FETCH_CHARITY_SEARCH_RESULTS_SUCCESS:
        {
            const charityEins = action.charities.map((charity) => {
                return charity.ein
            });

            console.log('search result eins ' + JSON.stringify(charityEins, null, 2));

            const updatedState = Object.assign({}, state, {
                searchResults: {
                    charityEins: charityEins,
                    pagination: action.pagination,
                    loading: false
                }
            });
            console.log('added search results to charity state: ' + JSON.stringify(updatedState, null, 2))

            return updatedState;
        }
        case FETCH_CHARITY_SEARCH_RESULTS_ERROR:
        {
            return Object.assign({}, state, {searchResults: {error: action.error, loading: false}});
        }
        case RESET_CHARITY_SEARCH_RESULTS:
        {
            return Object.assign({}, state, {
                searchResults: {
                    charityEins: [],
                    pagination: null
                }
            });
        }
        default:
            return state;
    }
};

export default currentCharities;