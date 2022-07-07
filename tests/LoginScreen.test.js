/* eslint-disable max-len */
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import LoginScreen from '../pages/LoginScreen';
import App from '../App';

const EMAIL_ID = 'email-input';
const PASSWORD_ID = 'password-input';
const BUTTON_ID = 'login-submit-btn';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '1234567';

describe('Testing the LoginScreen', () => {
  test('Test the email and password inputs, as well as the button, are rendered on the screen', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(EMAIL_ID);
    const inputPassword = screen.getByTestId(PASSWORD_ID);
    const inputButton = screen.getByTestId(BUTTON_ID);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(inputButton).toBeInTheDocument();
  });
  test('Test whether the user is able to write within the inputs', () => {
    renderWithRouter(<LoginScreen />);

    const inputEmail = screen.getByTestId(EMAIL_ID);
    const inputPassword = screen.getByTestId(PASSWORD_ID);

    userEvent.type(inputEmail, VALID_EMAIL);
    expect(inputEmail).toHaveValue(VALID_EMAIL);

    userEvent.type(inputPassword, VALID_PASSWORD);
    expect(inputPassword).toHaveValue(VALID_PASSWORD);
  });
  test(`Test if the form only becomes valid and the button enabled after a valid email and
    a password longer than 6 characters is entered into the inputs`, () => {
    renderWithRouter(<LoginScreen />);
    const inputButton = screen.getByTestId(BUTTON_ID);

    const inputEmail = screen.getByTestId(EMAIL_ID);
    userEvent.type(inputEmail, 'incorrectEmail');
    expect(inputButton).toBeDisabled();

    const inputPassword = screen.getByTestId(PASSWORD_ID);
    userEvent.type(inputPassword, '123');
    expect(inputButton).toBeDisabled();

    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.type(inputPassword, VALID_PASSWORD);
    expect(inputButton).toBeEnabled();
  });
  test(`Test if route changes to the main screen of food recipes
   after clicking on the validate email and password button`, () => {
    const { history } = renderWithRouter(<App />);

    const inputButton = screen.getByTestId(BUTTON_ID);
    const inputEmail = screen.getByTestId(EMAIL_ID);
    const inputPassword = screen.getByTestId(PASSWORD_ID);

    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.type(inputPassword, VALID_PASSWORD);
    userEvent.click(inputButton);

    expect(history.location.pathname).toBe('/foods');

    const mealsTokenLocalStorage = localStorage.getItem('mealsToken');
    expect(mealsTokenLocalStorage).toBe('1');

    const cocktailsTokenLocalStorage = localStorage.getItem('cocktailsToken');
    expect(cocktailsTokenLocalStorage).toBe('1');
  });
});
