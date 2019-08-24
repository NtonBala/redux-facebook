// Core
import { createStore } from 'redux';

// Reducer
import { rootReducer } from './rootReducer';

// Enhancer
import { enhancer } from './middleware/core';

export const store = createStore(
    rootReducer,
    enhancer
);
