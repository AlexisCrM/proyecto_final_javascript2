import icons from '../img/icons.svg';
import * as model from './model.js'; // Importamos todo el modelo

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const renderSpinner = function (parentEl) {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    renderSpinner(recipeContainer);

    // 1. Cargamos la receta usando el modelo (Avance 2 - Punto 1b-ii)
    await model.loadRecipe(id);

    // 2. Obtenemos la receta directamente desde el estado del modelo (Avance 2 - Punto 1b-iii)
    const { recipe } = model.state;

    // 3. Renderizamos el HTML con los datos de la receta
    const markup = `
      <figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${recipe.ingredients
            .map(ing => {
              return `
              <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ing.quantity}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
                </div>
              </li>
            `;
            })
            .join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;

    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    alert(err);
  }
};

// Escuchamos los eventos de cambio de hash y carga de la página
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes),
);
