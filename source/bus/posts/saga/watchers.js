// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { CREATE_POST_ASYNC } from '../types';

// Warkers
import { createPost } from './workers';

function* watchCreatePost () {
    yield takeEvery(CREATE_POST_ASYNC, createPost);
}

export function* watchPosts () {
    yield all([
        call(watchCreatePost)
    ]);
}
