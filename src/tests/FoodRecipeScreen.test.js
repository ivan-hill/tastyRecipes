import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import FoodRecipeScreen from '../pages/FoodRecipeScreen';
import renderWithRouter from '../helpers/renderWithRouter';
import ProviderFoods from '../context/contextFoodRecipe/ProviderFoods';
import ProviderDrinks from '../context/contextDrinks/ProviderDrinks';

const mockCategories = {
  meals: [
    { strCategory: 'Beef' },
    { strCategory: 'Breakfast' },
    { strCategory: 'Chicken' },
    { strCategory: 'Dessert' },
    { strCategory: 'Goat' },
  ],
};
const { screen } = require('@testing-library/react');

const searchButtonTestID = 'search-top-btn';
const profileButtonTestID = 'profile-top-btn';
/* const FIVE = 5; */
const TWELVE = 12;

afterEach(() => jest.clearAllMocks());

describe('Implement the elements principal of recipes', () => {
  test('1- Implement the elements in the main screen of recipes', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    const profileIcon = screen.getByTestId(profileButtonTestID);
    const titlePageFoods = screen.getByRole('heading', { name: /foods/i });
    const searchTopButton = screen.getByTestId(searchButtonTestID);
    const allCards = await screen.findAllByTestId(/-recipe-card/);
    console.log(allCards.length);
    expect(profileIcon).toBeInTheDocument();
    expect(titlePageFoods).toBeInTheDocument();
    expect(searchTopButton).toBeInTheDocument();
    expect(allCards.length).toEqual(TWELVE);
  });

  it(`check for an alert that reads:
  "Sorry, we haven't found any recipes for these filters."`, async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const searchTopButton = screen.getByTestId(searchButtonTestID);
    expect(searchTopButton).toBeDefined();

    userEvent.click(searchTopButton);
    const searchPlace = screen.getByTestId('search-input');
    expect(searchPlace).toBeInTheDocument();

    const radioButtonFirstLetter = screen.getByText(/first letter/i);
    expect(radioButtonFirstLetter).toBeInTheDocument();
    const execSearchButton = screen.getByTestId('exec-search-btn');
    expect(execSearchButton).toBeInTheDocument();

    userEvent.click(radioButtonFirstLetter);
    userEvent.type(searchPlace, 'aaa');
    userEvent.click(execSearchButton);
    const message = `Sorry, we haven't
   found any recipes for these filters.`;
    expect(message).toBeDefined();
  });

  it('check for rendered categories', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCategories),
    });

    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push('/foods');
    const categoriaAll = await screen.findByRole('button', { name: /all/i });
    const categoriaBeef = await screen.findByRole('button', { name: /beef/i });
    const categoriaBreakfast = screen.getByRole('button', {
      name: /breakfast/i,
    });
    const categoriaChicken = await screen.findByRole('button', {
      name: /chicken/i,
    });
    const categoriaGoat = await screen.findByRole('button', { name: /goat/i });
    const categoriaDessert = await screen.findByRole('button', {
      name: /dessert/i,
    });

    expect(categoriaAll).toBeInTheDocument();
    expect(categoriaBeef).toBeInTheDocument();
    expect(categoriaBreakfast).toBeInTheDocument();
    expect(categoriaChicken).toBeInTheDocument();
    expect(categoriaDessert).toBeInTheDocument();
    expect(categoriaGoat).toBeInTheDocument();

    userEvent.click(categoriaAll);
    userEvent.click(categoriaBeef);
    userEvent.click(categoriaBreakfast);
    userEvent.click(categoriaChicken);
    userEvent.click(categoriaDessert);
    userEvent.click(categoriaGoat);
  });
});
