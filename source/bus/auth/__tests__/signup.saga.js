// Core
import { put, apply } from 'redux-saga/effects';
import { actions as rrfActions } from 'react-redux-form';
// Helper that allows to test complex redux saga's scenarios
import { cloneableGenerator } from 'redux-saga/utils';

// Instruments
import { api } from '../../../REST';
import { authActions } from '../../auth/actions';
import { uiActions } from '../../ui/actions';

// Saga
import { signup } from '../saga/workers';

const signupAction = authActions.signupAsync(__.userProfile);

const saga = cloneableGenerator(signup)(signupAction);
