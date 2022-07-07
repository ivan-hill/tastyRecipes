import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import ProviderFoods from '../context/contextFoodRecipe/ProviderFoods';
import ProviderDrinks from '../context/contextDrinks/ProviderDrinks';

const { screen } = require('@testing-library/react');

const EXPLORE = '/explore';

describe('Implement the screen Explore ', () => {
  test('1-Test if the title and the buttons are on the Explore screen', () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push(EXPLORE);

    const titlePageExplore = screen.getByRole('heading', { name: /explore/i });
    const foodButton = screen.getByRole('button', { name: /explore foods/i });
    const drinkButton = screen.getByRole('button', { name: /explore drinks/i });

    expect(titlePageExplore).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
  });

  it(`verify if the button Foods,
  Redirects to /explore/foods`, () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push(EXPLORE);

    const foodButton = screen.getByRole('button', { name: /explore foods/i });

    expect(foodButton).toBeInTheDocument();

    userEvent.click(foodButton);
    expect(history.location.pathname).toBe('/explore/foods');
  });

  it(`verify if the button drinks,
  redirect to /explore/drinks`, () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push(EXPLORE);
    const drinkButton = screen.getByRole('button', { name: /explore drinks/i });

    expect(drinkButton).toBeInTheDocument();

    userEvent.click(drinkButton);
    expect(history.location.pathname).toBe('/explore/drinks');
  });
});
