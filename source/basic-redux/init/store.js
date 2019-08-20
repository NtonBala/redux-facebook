// Core
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

// Reducer
import { rootReducer } from './rootReducer';

const logger = createLogger({
    duration:  true,
    collapsed: true,
    colors:    {
        title:     () => '#1398FE',
        prevState: () => '#1C5FAF',
        action:    () => '#149945',
        nextState: () => '#A47104',
        error:     () => '#FF0005',
    },
});

const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools ? devTools : compose;

const middleware = [
    logger
];

const enhancer = composeEnhancers(
    applyMiddleware(...middleware)
);

const preloadedState = JSON.parse(localStorage.getItem('gallery'));

export const store = preloadedState
    ? createStore(
        rootReducer,
        preloadedState,
        enhancer
    )
    : createStore(
        rootReducer,
        enhancer
    );

store.subscribe(() => {
    const state = store.getState();

    localStorage.setItem('gallery', JSON.stringify(state));
});
