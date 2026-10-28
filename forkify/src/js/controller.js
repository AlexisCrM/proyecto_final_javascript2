import * as model from './model.js';
import recipeView from './views/RecipeView.js'; // Importamos la vista

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 1. Renderizar el spinner usando el método de la vista (Avance 2 - Punto 2c-iv)
    recipeView.renderSpinner();

    // 2. Cargar la receta desde el modelo
    await model.loadRecipe(id);

    // 3. Renderizar la receta usando la vista y pasando los datos del state (Avance 2 - Punto 2c-iv)
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// Escuchamos los eventos de cambio de hash y carga de la página
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes),
);
