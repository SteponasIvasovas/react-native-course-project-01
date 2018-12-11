import { AUTH_TRY } from './../actionsTypes/actionTypes.js';

export const authTry = authData => {
	return {
		type: AUTH_TRY,
		authData: authData,
	};
};
