// Core
import { put, apply } from 'redux-saga/effects';
import { delay } from 'redux-saga';

// Instruments
import { api } from '../../../../REST';
import { authActions } from '../../../auth/actions';
import { uiActions } from '../../../ui/actions';

export function* signup ({ payload: userInfo }) {
    try {
        yield put(uiActions.startFetching());

        console.log('-> user info:', userInfo);

        yield delay(2000);

        yield put(authActions.authenticate());

        // const response = yield apply(api, api.posts.fetch);
        // const { data: posts, message } = yield apply(response, response.json);

        // if (response.status !== 200) {
        //     throw new Error(message);
        // }

    } catch (error) {
        yield put(uiActions.emitError(error, 'signup worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
