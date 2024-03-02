'use strict'

export const CONFIG_SIGNUP = {
    loginLabel:{
        tagName: 'h2',
        innerHTML: 'Регистрация',
    },
    email: {
        tagName: 'input',
        type: 'email',
        placeholder: 'Aдресс почты',
        name: 'email',
    },
    password: {
        tagName: 'input',
        type: 'password',
        placeholder: 'Пароль',
        name: 'password',
    },
    repeatPassword: {
        tagName: 'input',
        type: 'password',
        placeholder: 'Пароль',
        name: 'repeatPassword',
    },
    loginButton: {
        tagName: 'input',
        type: 'submit',
        value: 'Войти',
        name: 'loginButton',
    },
};