import * as model from './model.js';
import recipeView from './views/RecipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 1. Renderizar el spinner
    recipeView.renderSpinner();

    // 2. Cargar la receta
    await model.loadRecipe(id);

    // 3. Renderizar la receta
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1. Obtener la consulta de búsqueda
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Cargar los resultados de búsqueda
    await model.loadSearchResults(query);

    // 3. Renderizar resultados
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
