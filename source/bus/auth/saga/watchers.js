// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { types } from '../types';

// Workers
import { signup } from './workers';

function* watchSignup () {
    yield takeEvery(types.SIGNUP_ASYNC, signup);
}

export function* watchAuth () {
    yield all([
        call(watchSignup)
    ]);
}
