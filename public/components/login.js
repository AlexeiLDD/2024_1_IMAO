'use strict'

export const CONFIG_LOGIN = {
    loginLabel:{
        tagName: 'h2',
        innerHTML: 'Авторизация',
    },
    userName: {
        tagName: 'input',
        type: 'text',
        placeholder: 'Имя пользователя',
        name: 'userName',
    },
    password: {
        tagName: 'input',
        type: 'password',
        placeholder: 'Пароль',
        name: 'password',
    },
    loginButton: {
        tagName: 'input',
        type: 'submit',
        value: 'Войти',
        name: 'loginButton',
    },
};
