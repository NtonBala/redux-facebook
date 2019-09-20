// Types
import { types } from './types';

export const authActions = {
    // Sync
    authenticate: () => {
        return {
            type: types.AUTHENTICATE,
        };
    },
    initialize: () => {
        return {
            type: types.INITIALIZE,
        };
    },

    // Async
    signupAsync: (userData) => {
        return {
            type:    types.SIGNUP_ASYNC,
            payload: userData,
        };
    },
    loginAsync: (credentials) => {
        return {
            type:    types.LOGIN_ASYNC,
            payload: credentials,
        };
    },
    authenticateAsync: () => { // Authenticate with token
        return {
            type: types.AUTHENTICATE_ASYNC,
        };
    },
    initializeAsync: () => {
        return {
            type: types.INITIALIZE_ASYNC,
        };
    },
};
