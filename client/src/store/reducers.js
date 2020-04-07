import { combineReducers } from 'redux';

import { authReducer } from '../pages/Auth/reducers';

export const reducer = combineReducers({ authReducer });
