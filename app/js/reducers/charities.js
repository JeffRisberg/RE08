import { SET_CHARITIES, APPEND_CHARITIES, FETCH_CHARITY_SEARCH_RESULTS_SUCCESS, RESET_CHARITY_SEARCH_RESULTS, FETCH_CHARITY_SEARCH_RESULTS_REQUEST, FETCH_CHARITY_SEARCH_RESULTS_ERROR } from '../constants/ActionTypes'

const charities = (state = [], action = {}) => {
    switch (action.type) {
        case SET_CHARITIES: // clear prior charities
        {
            const blockId = action.blockId;
            const charities = action.charities;

            const records = state.records;

            var idList = [];
            action.charities.forEach(record => {
                records[record.ein] = record;
                idList.push(record.ein);
            });

            const idLists = Object.assign({}, state.idLists, { [blockId]: idList });

            return {idLists, records};
        }
        case APPEND_CHARITIES:
        {
            const blockId = action.blockId;
            const charities = action.charities;

            var idList = [];
            action.charities.forEach(record => {
                state.records[record.ein] = record;
                idList.push(record.ein);
            });

            const idLists = Object.assign({}, state.idLists, { [blockId]: idList });

            return {idLists, records};
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

export default charities;