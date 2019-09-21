// Instruments
import { MAIN_URL, groupId } from './config';

export const api = {
    get token () {
        return localStorage.getItem('token');
    },

    auth: {
        signup (userInfo) {
            return fetch(`${MAIN_URL}/user/${groupId}`, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo),
            });
        },
        login ({ email, password }) {
            return fetch(`${MAIN_URL}/user/login`, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
        },
        // Method for authentication with the help of token
        // used in appropriate worker saga
        authenticate () {
            return fetch(`${MAIN_URL}/user/login`, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: this.token }),
            });
        },
        // Make request to invalidate JVT token on server
        logout () {
            return fetch(`${MAIN_URL}/user/logout`, {
                method:  'GET',
                headers: {
                    Authorization: this.token,
                },
            });
        },
    },

    posts: {
        fetch () {
            return fetch(`${MAIN_URL}/feed`, {
                method:  'GET',
                headers: {
                    Authorization: this.token,
                },
            });
        },
        create (comment) {
            return fetch(`${MAIN_URL}/feed`, {
                method:  'POST',
                headers: {
                    Authorization:  this.token, //add token so server could identify the post's author
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment }),
            });
        },
    },
};
