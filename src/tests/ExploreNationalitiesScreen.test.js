import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import ProviderFoods from '../context/contextFoodRecipe/ProviderFoods';
import ProviderDrinks from '../context/contextDrinks/ProviderDrinks';

const { screen } = require('@testing-library/react');

const EXPLORE_FOOD_NATIONALITIES = '/explore/foods/nationalities';

describe('Implement the screen Explore Foods Ingredients', () => {
  test('1-Test if the title and the buttons are on the tela Explore', async () => {
    fetch(meals);
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push(EXPLORE_FOOD_NATIONALITIES);

    const titlePageExploreFoodNationalities = screen.getByRole('heading', {
      name: /explore nationalities/i,
    });
    const TWELVE = 12;
    expect(titlePageExploreFoodNationalities).toBeInTheDocument();

    const cardsRecipes = await screen.findAllByTestId(/card-img/i);
    expect(cardsRecipes.length).toBe(TWELVE);
    const select = await screen.findByTestId('explore-by-nationality-dropdown');
    userEvent.selectOptions(select, ['All', 'Vietnamese']);
    const americaArea = await screen.findByTestId('American-option');
    expect(americaArea).toBeInTheDocument();
    /*  userEvent.selectOptions(americaArea);

    const pancake = await screen.findByText(/banana pancakes/i);
    expect(pancake).toBeInTheDocument(); */
  });
});
