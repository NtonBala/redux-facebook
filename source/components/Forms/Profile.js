// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Control } from 'react-redux-form';
import cx from 'classnames';
import { Map } from 'immutable';

// Instruments
import Styles from './styles.m.css';
import { validateLength } from '../../instruments/validators';
import { book } from '../../navigation/book';

// Components
import { Input } from '../../components';

export default class Profile extends Component {
    static defaultProps = {
        // State
        isFetching: false,
        profile:    Map(),

        // Actions
        updateNameAsync:   () => {},
        updateAvatarAsync: () => {},
    };

    _submitUserInfo = (userInfo) => {
        const { updateNameAsync, updateAvatarAsync } = this.props;

        if (userInfo.avatar.length) {
            const { avatar } = userInfo;

            updateAvatarAsync(avatar);
        }

        const { firstName, lastName } = userInfo;

        updateNameAsync({ firstName, lastName });
    };

    render () {
        const { profile, isFetching } = this.props;

        const buttonStyle = cx(Styles.loginSubmit, {
            [Styles.disabledButton]: isFetching,
        });
        const buttonMessage = isFetching ? 'Загрузка...' : 'Обновить профиль';

        // <Form> - is the main component, it's wrapper for all other form components.
        // <Control> - is an element of the form (text input, text area, checkbox or any other input type).

        // Form's component "model" prop holds address pointing to the form's model in Redux store
        // In this case Form component expects Redux store to have object "forms"
        // with nested "user" object holding "profile" object,
        // which is expected to describe Form model (all fields and initial state).

        // Control component also holds prop "model" which describes exactly that part of form's model
        // that <Control> is going to become.

        // react-redux-form fully automates interaction with Redux store.
        // In order to work it needs only specialized reducer created combineForms func from react-redux-form.
        // It does not need any connections - you can just import and use its components.
        return (
            <Form className = { Styles.form } model = 'forms.user.profile' onSubmit = { this._submitUserInfo }>
                <div className = { Styles.wrapper }>
                    <div>
                        <h1>Привет, {profile.get('firstName')}</h1>
                        <img src = { profile.get('avatar') } />
                        <Control.file
                            className = { Styles.fileInput }
                            disabled = { isFetching }
                            id = 'file'
                            model = 'forms.user.profile.avatar'
                            name = 'file'
                        />
                        <label htmlFor = 'file'>Выбери новый аватар</label>
                        <Input
                            disabled = { isFetching }
                            disabledStyle = { Styles.disabledInputRedux }
                            id = 'forms.user.profile.firstName'
                            invalidStyle = { Styles.invalidInput }
                            model = 'forms.user.profile.firstName'
                            placeholder = 'Имя'
                            validators = { {
                                valid: (name) => !validateLength(name, 1),
                            } }
                        />
                        <Input
                            disabled = { isFetching }
                            disabledStyle = { Styles.disabledInputRedux }
                            id = 'forms.user.profile.lastName'
                            invalidStyle = { Styles.invalidInput }
                            model = 'forms.user.profile.lastName'
                            placeholder = 'Фамилия'
                            validators = { {
                                valid: (lastName) => !validateLength(lastName, 1),
                            } }
                        />
                        <button className = { buttonStyle } disabled = { isFetching } type = 'submit'>
                            {buttonMessage}
                        </button>
                    </div>
                    <Link to = { book.newPassword }>сменить пароль →</Link>
                </div>
            </Form>
        );
    }
}
