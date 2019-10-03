// Core
import { put, apply } from 'redux-saga/effects';
import { actions as rrfActions } from 'react-redux-form';

// Instruments
import { api } from '../../../../REST';
import { authActions } from '../../../auth/actions';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../../profile/actions';

export function* login ({ payload: credentials }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.auth.login, [credentials]);
        const { data: profile, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }

        if (credentials.remember) {
            yield apply(localStorage, localStorage.setItem, ['remember', true]);
        }

        yield apply(localStorage, localStorage.setItem, ['token', profile.token]);

        yield put(profileActions.fillProfile(profile));

        // rrfActions.change() - action that changes form's field state in Redux store
        yield put(rrfActions.change('forms.user.profile.firstName', profile.firstName));
        yield put(rrfActions.change('forms.user.profile.lastName', profile.lastName));

        yield put(authActions.authenticate());
    } catch (error) {
        yield put(uiActions.emitError(error, 'login worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
