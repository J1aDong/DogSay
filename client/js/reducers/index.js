'use strict';

import {combineReducers} from 'redux';
import videoList from './videoList';

const rootReducer = combineReducers({
    videoList
});

export default rootReducer;