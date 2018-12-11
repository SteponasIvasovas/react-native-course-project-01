import * as aT from './../actionsTypes/actionTypes.js';

export const placeAdd = placeName => {
	return {
		type: aT.PLACE_ADD,
		placeName: placeName,
	};
};

export const placeDelete = placeKey => {
	return {
		type: aT.PLACE_DELETE,
		placeKey: placeKey,
	};
};
