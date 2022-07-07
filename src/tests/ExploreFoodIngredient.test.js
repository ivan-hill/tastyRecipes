import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import ProviderFoods from '../context/contextFoodRecipe/ProviderFoods';
import ProviderDrinks from '../context/contextDrinks/ProviderDrinks';

const { screen } = require('@testing-library/react');

const EXPLORE_FOOD_INGREDIENTS = '/explore/foods/ingredients';

describe('Implement the screen Explore Foods Ingredients', () => {
  test('1-Test if the title and the buttons are on the Explore screen', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealIngredients),
    });
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push(EXPLORE_FOOD_INGREDIENTS);

    const titlePageExploreFoodIngredients = screen.getByRole('heading', {
      name: /explore ingredients/i,
    });
    const TWELVE = 12;
    expect(titlePageExploreFoodIngredients).toBeInTheDocument();
    const cardsIngredients = await screen.findAllByTestId(/-ingredient-card/i);
    expect(cardsIngredients.length).toBe(TWELVE);

    const foodChicken = await screen.findByText(/chicken/i);
    expect(foodChicken).toBeInTheDocument();
    userEvent.click(foodChicken);
    /* q */
  });
});
