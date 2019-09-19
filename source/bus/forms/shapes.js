// Core
import { object, string, boolean } from 'yup';

// Instruments
import { invite } from '../../REST/config';

export const login = {
    shape: {
        email:    'elon.mask@space.x',
        password: '12345',
        remember: false,
    },
    schema: object().shape({
        email: string()
            .email()
            .required(),
        password: string()
            .min(5)
            .required(),
        remember: boolean(),
    }),
};

export const signup = {
    // initial form state
    shape: {
        firstName: 'Elon',
        lastName:  'Mask',
        email:     'elon.mask@space.x',
        password:  '12345',
        invite,
    },
    // fields' validation rules
    schema: object().shape({
        firstName: string().required(),
        lastName:  string().required(),
        email:     string()
            .required()
            .email(),
        password: string()
            .required()
            .min(5),
        invite: string()
            .required()
            .min(12)
            .max(12),
    }),
};

export const newPassword = {
    shape: {
        oldPassword: '',
        newPassword: '',
    },
    schema: object().shape({
        oldPassword: string()
            .required()
            .min(5),
        newPassword: string()
            .required()
            .min(5),
    }),
};

export const composer = {
    shape: {
        comment: '',
    },
    schema: object().shape({
        comment: string()
            .required()
            .min(1),
    }),
};
