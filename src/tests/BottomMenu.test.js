import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FoodRecipeScreen from '../pages/FoodRecipeScreen';
import ProviderDrinks from '../context/contextDrinks/ProviderDrinks';
import ProviderFoods from '../context/contextFoodRecipe/ProviderFoods';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import DrinksRecipeScreen from '../pages/DrinkRecipeScreen';

describe('19 - Implement the elements of the Bottom Menu', () => {
  it('Tests whether it has the required data-testsId', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const footer = screen.getByTestId('footer');
    const drinkBottom = screen.getByTestId('drinks-bottom-btn');
    const exploreBottom = screen.getByTestId('explore-bottom-btn');
    const foodBottom = screen.getByTestId('food-bottom-btn');
    expect(footer).toBeDefined();
    expect(drinkBottom).toBeDefined();
    expect(exploreBottom).toBeDefined();
    expect(foodBottom).toBeDefined();
  });
});

describe('20 - Position the bottom menu in a fixed way and display 3 icons', () => {
  it('Tests if the menu is fixed at the bottom of the page', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const footer = screen.getByTestId('footer');
    // console.log(footer.style);
    expect(footer).toBeDefined();
    expect(footer).toHaveStyle(`
      position: fixed; 
      bottom: 0
    `);
  });

  it('Tests that you have the correct icons', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const drinkBottom = screen.getByAltText('Drink icon');
    expect(drinkBottom).toHaveAttribute('src', 'drinkIcon.svg');
    const exploreBottom = screen.getByAltText('Explore Icon');
    expect(exploreBottom).toHaveAttribute('src', 'exploreIcon.svg');
    const foodBottom = screen.getByAltText('Food Icon');
    expect(foodBottom).toHaveAttribute('src', 'mealIcon.svg');
  });
});

describe('21 - Display the bottom menu only on the screens indicated', () => {
  it('Tests whether there is a footer on the main beverage recipe screen', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <DrinksRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    const footer = screen.getByTestId('footer');
    expect(footer).toBeDefined();
  });
  it('Test if there is a footer on the main recipe screen', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const footer = screen.getByTestId('footer');
    expect(footer).toBeDefined();
  });
  it('Test if you have footer on the explore screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeDefined();
  });
  it('Test if you have a footer on the explore screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeDefined();
  });
  it('Tests whether there is a footer on the explore drinks screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeDefined();
  });
  it('Test if you have footer on the explorer screen food per ingredient', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/ingredients');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeDefined();
  });
  it('Test if you have footer on the explorer screen bebidas per ingredient', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks/ingredients');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeDefined();
  });
  it('Test if you have footer on the explorer screen food for nationalities', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/nationalities');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeDefined();
  });
  it('Test if you have footer in your profile screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  it('Test if there is no footer on the screen of Login', () => {
    renderWithRouter(<App />);
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeNull();
  });
  it('Test if there is no footer on the screen of details of a food recipe', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/:id');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeNull();
  });
  it('Test if there is no footer on the screen of details of a drink recipe', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/:id');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeNull();
  });
  it('Test if there is no footer on the screen of recipe in progress of food', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/:id/in-progress');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeNull();
  });
  it('Test if there is no footer on the screen of recipe in progress of drinks', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/:id/in-progress');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeNull();
  });
  it('Test if there is no footer on the screen of recipe done', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeNull();
  });
  it('Test if there is no footer on the screen of recipe favorites', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeNull();
  });
});

describe('22 - Redirects to the correct routes by clicking on the icons', () => {
  it('Test if Redirects to drinks screen by clicking the drink icon', () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const drinkBottom = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkBottom);
    expect(history.location.pathname).toBe('/drinks');
  });
  it('Test if Redirects to screen of food by clicking on the food icon', () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const foodBottom = screen.getByTestId('food-bottom-btn');
    userEvent.click(foodBottom);
    expect(history.location.pathname).toBe('/foods');
  });
  it('Test if Redirects to screen of explorar by clicking on the expoler icon', () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const exploreBottom = screen.getByTestId('explore-bottom-btn');
    userEvent.click(exploreBottom);
    expect(history.location.pathname).toBe('/explore');
  });
});
