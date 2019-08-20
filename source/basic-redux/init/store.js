// Core
import { createStore } from 'redux';

// Reducer
import { rootReducer } from './rootReducer';

export const store = createStore(rootReducer);
