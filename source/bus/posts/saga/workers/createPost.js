// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';
import { postsActions } from '../../actions';

export function* createPost ({ payload: comment }) {
    const response = yield apply(api, api.posts.create, [comment]);
    const result = yield apply(response, response.json);

    yield put(postsActions.createPost(result.data));
}
