import React from "react";
import userEvent from "@testing-library/user-event";

import App from "../App";
import renderWithRouter from "../helpers/renderWithRouter";
import ProviderFoods from "../context/contextFoodRecipe/ProviderFoods";
import ProviderDrinks from "../context/contextDrinks/ProviderDrinks";

const { screen } = require("@testing-library/react");

const EXPLORE_DRINKS_INGREDIENTS = "/explore/drinks/ingredients";

describe("Implement the screen Explore Drinks Ingredients", () => {
  test("1-Test if the title and the buttons are on the Explore screen", async () => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkIngredients),
    });
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>
    );

    history.push(EXPLORE_DRINKS_INGREDIENTS);

    const titlePageExploreDrinksIngredients = screen.getByRole("heading", {
      name: /explore ingredients/i,
    });
    const TWELVE = 12;
    expect(titlePageExploreDrinksIngredients).toBeInTheDocument();
    const cardsIngredients = await screen.findAllByTestId(/-ingredient-card/i);
    expect(cardsIngredients.length).toBe(TWELVE);

    const drinkRun = await screen.findByText(/light rum/i);
    expect(drinkRun).toBeInTheDocument();
    userEvent.click(drinkRun);
    /* q */
  });
});
