/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React from 'react';
import userEvent from '@testing-library/user-event';

import FoodRecipeScreen from '../pages/FoodRecipeScreen';
import renderWithRouter from '../helpers/renderWithRouter';
import ProviderFoods from '../context/contextFoodRecipe/ProviderFoods';
import ProviderDrinks from '../context/contextDrinks/ProviderDrinks';
import DrinksRecipeScreen from '../pages/DrinkRecipeScreen';
import App from '../App';

const { screen } = require('@testing-library/react');

const searchButtonTestID = 'search-top-btn';
const profileButtonTestID = 'profile-top-btn';
afterEach(() => jest.clearAllMocks());

describe('Set up a HeaderComponent ', () => {
  test('9- Implement the header elements on the main screen of recipes', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const profileIcon = screen.getByTestId(profileButtonTestID);
    const titlePage = screen.getByTestId('page-title');
    const searchTopButton = screen.getByTestId(searchButtonTestID);

    expect(profileIcon).toBeInTheDocument();
    expect(titlePage).toBeInTheDocument();
    expect(searchTopButton).toBeInTheDocument();
  });

  test('10- Implement an icon for the profile screen', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const profileIcon = screen.getByTestId(profileButtonTestID);

    expect(profileIcon).toBeInTheDocument();
  });

  test('10.2- Implement a title', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const titleHeader = screen.getByRole('heading', { name: /foods/i });

    expect(titleHeader).toBeInTheDocument();
  });

  test('10.3- Implement a search button', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const searchIcon = screen.getByTestId(searchButtonTestID);

    expect(searchIcon).toBeInTheDocument();
  });

  test(`11-Redirects the user person to the profile screen
  by clicking on the profile button`, async () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const profileIcon = screen.getByTestId(profileButtonTestID);
    expect(profileIcon).toBeInTheDocument();
    // history.location.pathname
    userEvent.click(profileIcon);
    expect(history.location.pathname).toEqual('/profile');
  });

  test('12 - Develop the search button that, when clicked, the search bar should appear. The same goes for hiding it', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const searchTopButton = screen.getByTestId(searchButtonTestID);
    expect(searchTopButton).toBeInTheDocument();

    userEvent.click(searchTopButton);
    const searchPlace = screen.getByTestId('search-input');
    expect(searchPlace).toBeInTheDocument();
    userEvent.click(searchTopButton);
    expect(searchPlace).not.toBeInTheDocument();
  });

  test('13 - Implement the elements of the search bar respecting the attributes described in the prototype', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    const searchButton = screen.getByTestId(searchButtonTestID);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const radioButtonIngredient = screen.getByText(/ingredient/i);
    const radioButtonName = screen.getByText(/name/i);
    const radioButtonFirstLetter = screen.getByText(/first letter/i);
    const execSearchButton = screen.getByTestId('exec-search-btn');

    expect(radioButtonFirstLetter).toBeInTheDocument();
    expect(radioButtonIngredient).toBeInTheDocument();
    expect(radioButtonName).toBeInTheDocument();
    expect(execSearchButton).toBeInTheDocument();
  });

  test(`14 - Position the bar just below the header and
  implement 3 radio buttons: Ingredient, Name and First letter`, () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const searchButton = screen.getByTestId(searchButtonTestID);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const radioButtonIngredient = screen.getByTestId('ingredient-search-radio');
    expect(radioButtonIngredient).toBeInTheDocument();

    const radioButtonName = screen.getByTestId('name-search-radio');
    expect(radioButtonName).toBeInTheDocument('first-letter-search-radio');

    const searcButton = screen.getByTestId('exec-search-btn');
    expect(searcButton).toBeInTheDocument();
  });
  test(`15 - Search the food API if the person
  is on the food page `, async () => {
    fetch(meals);
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    const renderedMeal = await screen.findByText(/corba/i);
    expect(renderedMeal).toBeInTheDocument();

    const rederDrink = screen.queryByRole('heading', { name: /drinks/i });
    expect(rederDrink).not.toBeInTheDocument();
  });

  test('16 - Search the drinks API if you are in the drinks API', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <DrinksRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const foodsTitle = screen.queryByRole('heading', { name: /foods/i });
    expect(foodsTitle).not.toBeInTheDocument();

    const drinkTitle = screen.getByRole('heading', { name: /drinks/i });
    expect(drinkTitle).toBeInTheDocument();

    const renderDrinks = await screen.findByText(/gg/i);
    expect(renderDrinks).toBeInTheDocument();
  });

  test('test the ingredient radio button ', async () => {
    fetch(mealsByIngredient);
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push('/foods');
    const searchButton = screen.getByTestId(searchButtonTestID);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const radioButtonIngredient = screen.getByTestId('ingredient-search-radio');
    expect(radioButtonIngredient).toBeInTheDocument();
    userEvent.click(radioButtonIngredient);

    const textBox = screen.getByRole('textbox');
    userEvent.type(textBox, 'chicken');

    const execSearchButton = screen.getByRole('button', { name: /search/i });
    userEvent.click(execSearchButton);
  });
});
