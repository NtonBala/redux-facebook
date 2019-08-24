// Core
import { applyMiddleware, compose } from 'redux';

// Middleware
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

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
const composeEnhancers = __DEV__ && devTools ? devTools : compose;

const middleware = [
    thunk
];

if (__DEV__) {
    middleware.push(
        logger
    );
}

const enhancer = composeEnhancers(
    applyMiddleware(...middleware)
);

export { enhancer };
