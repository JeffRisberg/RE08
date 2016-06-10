import { APPEND_CHARITIES, FETCH_CHARITY_SEARCH_RESULTS, RESET_CHARITY_SEARCH_RESULTS, FETCH_CHARITY_SEARCH_RESULTS_REQUEST, FETCH_CHARITY_SEARCH_RESULTS_ERROR } from '../constants/ActionTypes'

const charities = (state = [], action = {}) => {
    switch (action.type) {

        case APPEND_CHARITIES:
        {
            const updatedState = Object.assign({}, state);

            const idList = [];
            for (let key in action.charities) {
                let charity = action.charities[key];

                //console.log('charity ' + JSON.stringify(charity, null, 2))
                const ein = charity.ein;

                if (idList.indexOf(ein) < 0) {
                    idList.push(ein);
                    //console.log('added ' + ein + ' to charities[' + action.blockId + '].idList')
                }
                updatedState.records[ein] = charity;
            }

            Object.assign(updatedState.idLists, { [action.blockId]: idList });

            return updatedState;
        }
        case FETCH_CHARITY_SEARCH_RESULTS:
        {
            const charityEins = action.charities.map((charity) => {
                return charity.ein
            });

            //console.log('search result eins ' + JSON.stringify(charityEins, null, 2));

            const updatedState = Object.assign({}, state, {
                searchResults: {
                    charityEins: charityEins,
                    pagination: action.pagination,
                    loading: false
                }
            });

            return updatedState;
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