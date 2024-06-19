import { combineReducers, createStore } from 'redux';

import booksReducer from './reducers/booksReducer';
import filterReducer from './reducers/filterReducer';

const rootReducer = combineReducers({
    books: booksReducer,
    filter: filterReducer,
});

const store = createStore(rootReducer);

export default store;
