// Core
import { combineForms } from 'react-redux-form';

export const formsReducer = combineForms(
    {
        user: {
            profile: {
                firstName: 'test',
                lastName:  '',
                avatar:    [],
            },
        },
    },
    'forms'
);
