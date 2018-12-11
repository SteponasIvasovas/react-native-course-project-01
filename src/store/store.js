import { createStore, combineReducers, compose } from 'redux';
import placesReducer from './reducers/places.js';

const rootReducer = combineReducers({
	places: placesReducer,
});

let composeEnchancers = compose;

if (__DEV__) {
	composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(rootReducer, composeEnchancers());

export default store;
