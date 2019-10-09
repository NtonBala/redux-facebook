// Core
import { apply } from 'redux-saga/effects';
import { actions as rrfActions } from 'react-redux-form';
import { expectSaga } from 'redux-saga-test-plan';

// Instruments
import { api } from '../../../REST';
import { authActions } from '../../auth/actions';
import { uiActions } from '../../ui/actions';
import { profileActions } from '../../profile/actions';

// Saga
import { authenticate } from '../saga/workers';

describe('authenticate saga:', () => {
    test('should complete a 200 status response scenario', async () => {
        await expectSaga(authenticate)
            .put(uiActions.startFetching())
            .provide([[apply(api, api.auth.authenticate), __.fetchResponseSuccess]])
            .apply(localStorage, localStorage.setItem, ['token', __.token])
            .put(profileActions.fillProfile(__.userProfile))
            .put(rrfActions.change('forms.user.profile.firstName', __.userProfile.firstName))
            .put(rrfActions.change('forms.user.profile.lastName', __.userProfile.lastName))
            .put(authActions.authenticate())
            .put(uiActions.stopFetching())
            .put(authActions.initialize())
            .run();
    });
});
