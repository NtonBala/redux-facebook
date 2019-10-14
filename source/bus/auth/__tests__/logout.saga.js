// Core
import { apply } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import { actions as rrfActions } from 'react-redux-form';
import { expectSaga } from 'redux-saga-test-plan';

// Instruments
import { api } from '../../../REST';
import { book } from '../../../navigation/book';

// Actions
import { authActions } from '../../auth/actions';
import { uiActions } from '../../ui/actions';
import { profileActions } from '../../profile/actions';
import { postsActions } from '../../posts/actions';
import { usersActions } from '../../users/actions';

// Saga
import { logout } from '../saga/workers';

describe('logout saga:', () => {
    test('should complete a 204 status response scenario', async () => {
        await expectSaga(logout)
            .put(uiActions.startFetching())
            .provide([[apply(api, api.auth.logout), __.fetchResponseSuccess204]])
            .apply(localStorage, localStorage.removeItem, ['token'])
            .apply(localStorage, localStorage.removeItem, ['remember'])
            .put(profileActions.clearProfile())
            .put(postsActions.clearPosts())
            .put(usersActions.clearUsers())
            .put(rrfActions.reset('forms.user'))
            .put(uiActions.stopFetching())
            .put(authActions.logout())
            .put(replace(book.login))
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(logout)
            .put(uiActions.startFetching())
            .provide([[apply(api, api.auth.logout), __.fetchResponseFail400]])
            .apply(__.fetchResponseFail400, __.fetchResponseFail400.json)
            .put(uiActions.emitError(__.error, 'logout worker'))
            .apply(localStorage, localStorage.removeItem, ['token'])
            .apply(localStorage, localStorage.removeItem, ['remember'])
            .put(profileActions.clearProfile())
            .put(postsActions.clearPosts())
            .put(usersActions.clearUsers())
            .put(rrfActions.reset('forms.user'))
            .put(uiActions.stopFetching())
            .put(authActions.logout())
            .put(replace(book.login))
            .run();
    });
});
