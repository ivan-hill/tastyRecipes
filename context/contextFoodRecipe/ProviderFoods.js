import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import ContextFoodRecipe from './contextFoodRecipe';
import useFetch from '../../hooks/useFetch';

function ProviderFoods({ children }) {
  const USER_INITIAL_STATE = {
    typeSearch: '',
    textSearch: '',
    categoryFoods: '',
    recipeID: '',
    nationality: '',
  };

  // status of FOODS requests
  const [allFoodsData, setAllFoodsData] = useState([]); // all foods rendered by name
  const [error, setError] = useState('');
  const [foods, setFoods] = useState([]); // list of foods chosen by the user

  // checks whether the search was done by category
  const [isCategoryByFoods, setisCategoryByFoods] = useState(false);

  // status of user choices search type, input text, and category
  const [userChoiceFoods, setUserChoiceFoods] = useState(USER_INITIAL_STATE);

  // callAPi calls the api according to the user's search type
  const [callApi, setCallApi] = useState('');

  // ---------------------ENDPOINTS--------------------------------
  const { typeSearch, textSearch, categoryFoods, nationality } = userChoiceFoods;

  if (nationality) {
    const NATIONAL_API = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationality}`;
    setCallApi(NATIONAL_API);
    setUserChoiceFoods(USER_INITIAL_STATE);
  }

  if (categoryFoods) {
    const CATEGORY_API = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryFoods}`;
    setCallApi(CATEGORY_API);
    setUserChoiceFoods(USER_INITIAL_STATE);
  }
  if (typeSearch === 'ingredient') {
    const FOODS_INGREDIENT_API = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${textSearch}`;
    setCallApi(FOODS_INGREDIENT_API);
    setUserChoiceFoods(USER_INITIAL_STATE);
  }

  if (typeSearch === 'name' || categoryFoods === 'All') {
    const FOODS_NAME_API = `https://www.themealdb.com/api/json/v1/1/search.php?s=${textSearch}`;
    setCallApi(FOODS_NAME_API);
    setUserChoiceFoods(USER_INITIAL_STATE);
  }

  if (typeSearch === 'firstLetter') {
    const FOODS_FIRST_LETTERS_API = `https://www.themealdb.com/api/json/v1/1/search.php?f=${textSearch}`;
    setCallApi(FOODS_FIRST_LETTERS_API);
    setUserChoiceFoods(USER_INITIAL_STATE);
  }

  // ----------Calling the API's-----------------------------------
  const { data, isLoading } = useFetch(callApi);
  useEffect(() => {
    if (data) { setFoods(data.meals); }
  }, [data, callApi]);

  // ----- General API calls in DidMount ----------------------
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const dataAPI = await response.json();
        setAllFoodsData(dataAPI.meals);
      } catch (erro) {
        setError(erro.message);
      }
    })();
  }, []);

  const contextValue = {
    setCallApi,
    isCategoryByFoods,
    setisCategoryByFoods,
    allFoodsData,
    error,
    userChoiceFoods,
    setUserChoiceFoods,
    foods,
    setFoods,
    isLoading,
  };
  return (
    <ContextFoodRecipe.Provider value={ contextValue }>
      {children}
    </ContextFoodRecipe.Provider>
  );
}
ProviderFoods.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderFoods;
