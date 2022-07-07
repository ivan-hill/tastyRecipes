import React from "react";
import userEvent from "@testing-library/user-event";

import App from "../App";
import renderWithRouter from "../helpers/renderWithRouter";
import ProviderFoods from "../context/contextFoodRecipe/ProviderFoods";
import ProviderDrinks from "../context/contextDrinks/ProviderDrinks";

const { screen } = require("@testing-library/react");

const EXPLORE_DRINKS = "/explore/drinks";

afterEach(() => jest.clearAllMocks());

describe("Implemente na tela Explore Drinks", () => {
  test("1-Test if the title and the buttons are on the Explore screen Drinks", () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>
    );

    history.push(EXPLORE_DRINKS);

    const titlePageExploreDrinks = screen.getByRole("heading", {
      name: /explore drinks/i,
    });
    const ingredientButton = screen.getByRole("button", {
      name: /by ingredient/i,
    });
    const surpriseMeButton = screen.getByRole("button", {
      name: /surprise me!/i,
    });

    expect(titlePageExploreDrinks).toBeInTheDocument();
    expect(ingredientButton).toBeInTheDocument();
    expect(surpriseMeButton).toBeInTheDocument();
  });

  it(`verify if the button ingredient,
  redirect to /explore/drinks/ingredients`, () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>
    );

    history.push(EXPLORE_DRINKS);
    const ingredientButton = screen.getByRole("button", {
      name: /by ingredient/i,
    });
    expect(ingredientButton).toBeInTheDocument();

    userEvent.click(ingredientButton);
    expect(history.location.pathname).toBe("/explore/drinks/ingredients");
  });

  it(`verify if the surprise-me button,
  redirect to /explore/drinks/:id`, () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>
    );

    history.push(EXPLORE_DRINKS);
    const surpriseMeButton = screen.getByRole("button", {
      name: /surprise me!/i,
    });

    expect(surpriseMeButton).toBeInTheDocument();
  });
});
