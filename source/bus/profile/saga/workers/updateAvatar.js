// Core
import { put, apply } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import { api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../actions';

export function* updateAvatar ({ payload: [newAvatar] }) {
    try {
        yield put(uiActions.startFetching());

        // Files are sent to the server via body using form-data format.
        // Use FormData constructor to create form-data object.
        // FormData is Web API interface for sending data in key:value format.
        // Use append() method to tie new avatar image file to "avatar" key.
        const avatarFormData = yield new FormData();

        yield apply(avatarFormData, avatarFormData.append, ['avatar', newAvatar]);

        const response = yield apply(api, api.profile.updateAvatar, [avatarFormData]);
        const { data: newAvatarUrl, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(profileActions.updateAvatar(newAvatarUrl));

        yield put(actions.reset('forms.user.profile.avatar')); // Reset profile form avatar Control state
    } catch (error) {
        yield put(uiActions.emitError(error, 'updateAvatar worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
