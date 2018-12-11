import * as aT from './../actionsTypes/actionTypes.js';

const initialState = {
	places: [],
};

function placeAdd(state, action) {
	return {
		...state,
		places: [
			...state.places,
			{
				key: String(Math.random()),
				name: action.placeName,
				image: {
					uri: 'https://media.iperiago.com/photos/50c1236586943.jpeg',
				},
			},
		],
	};
}

function placeDelete(state, action) {
	return {
		...state,
		places: state.places.filter(place => place.key !== action.placeKey),
	};
}

function placesReducer(state = initialState, action) {
	switch (action.type) {
		case aT.PLACE_ADD:
			return placeAdd(state, action);
		case aT.PLACE_DELETE:
			return placeDelete(state, action);
		default:
			return state;
	}
}

export default placesReducer;
