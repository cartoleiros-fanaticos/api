import { createStore } from 'redux';

import moment from 'moment';

const data = moment().format('Y');

function seasson(state = data, action) {

    switch (action.type) {
        case 'ADD_SEASSON':
            return action.seasson;
        default:
            return state;
    }
}

const store = createStore(seasson);

export default store;