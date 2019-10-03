// Core
import { put, apply } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

// Instruments
import { api } from '../../../REST';
import { uiActions } from '../../ui/actions';
import { usersActions } from '../../users/actions';

// Saga
import { fetchUsers } from '../saga/workers';

const fetchUsersAction = usersActions.fetchUsersAsync();

const saga = cloneableGenerator(fetchUsers)();
let clone = null;

describe('fetchUsers saga:', () => {

});
