const categorySelect = document.querySelector("#categories");
const alcoholSelect = document.querySelector("#alcohol");
const glassSelect = document.querySelector("#glass");
const drinkContainer = document.querySelector(".drink-container");
const selectionH1 = document.querySelector(".selection-heading");
const drinkDetailsSection = document.querySelector(".drink-details-section");
const drinkDetailsContainer = document.querySelector(
  ".drink-details-container"
);
const welcomeSection = document.querySelector(".welcome"); //Welcome message
const mainTitle = document.querySelector(".main-title"); ///'Bottoms Up!' title

getCategories();
getAlcohol();
getGlass();

//drink categories fetch request
function getCategories() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
    .then((r) => r.json())
    .then((categories) => renderCategoriesOptions(categories.drinks))
    .catch((error) => alert(error));
}
//cocktail (alcohol base) fetch request
function getAlcohol() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
    .then((r) => r.json())
    .then((categories) => renderAlcoholOptions(categories.drinks))
    .catch((error) => alert(error));
}
//drink by glass type fetch request
function getGlass() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list")
    .then((r) => r.json())
    .then((glass) => renderGlassOptions(glass.drinks))
    .catch((error) => alert(error));
}
//rendering Categories list into select categories <option>
function renderCategoriesOptions(categories) {
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.strCategory;
    option.textContent = category.strCategory;
    categorySelect.append(option);
  });
}
//rendering alcoholic/non-alcoholic category list <option>
function renderAlcoholOptions(categories) {
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.strIngredient1;
    option.textContent = category.strIngredient1;
    alcoholSelect.append(option);
  });
}
//rendering glass types <option>
function renderGlassOptions(glass) {
  glass.forEach((glass) => {
    const option = document.createElement("option");
    option.value = glass.strGlass;
    option.textContent = glass.strGlass;
    glassSelect.append(option);
  });
}
//eventlistner change event
categorySelect.addEventListener("change", getDrinksByCategories);
alcoholSelect.addEventListener("change", getDrinksByAlcohol);
glassSelect.addEventListener("change", getDrinksByGlass);
//eventlistner click event when the main tile is clicked
mainTitle.addEventListener("click", showWelcome);

//get categories - change event
function getDrinksByCategories(e) {
  const category = e.target.value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((r) => r.json())
    .then((drinks) => renderAllDrinks(drinks.drinks))
    .catch((error) => alert(error));
}
//get alcohol(beverage base) - change event
function getDrinksByAlcohol(e) {
  const alcohol = e.target.value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${alcohol}`)
    .then((r) => r.json())
    .then((drinks) => renderAllDrinks(drinks.drinks))
    .catch((error) => alert(error));
}
//get glass type - change event
function getDrinksByGlass(e) {
  const glass = e.target.value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`)
    .then((r) => r.json())
    .then((drinks) => renderAllDrinks(drinks.drinks))
    .catch((error) => alert(error));
}

function renderAllDrinks(drinks) {
  welcomeSection.style.display = "none";
  drinkDetailsContainer.style.display = "none";
  //grid layout
  drinkContainer.style.display = "grid";
  //replaceing new children - drinks
  drinkContainer.replaceChildren();
  selectionH1.textContent =
    alcoholSelect.value || categorySelect.value || glassSelect.value;
  drinks.forEach((drink) => {
    renderDrinkCard(drink);
  });
  categorySelect.value = "";
  alcoholSelect.value = "";
  glassSelect.value = "";
}

function renderDrinkCard(drinks) {
  //img <div>
  const { strDrink, strDrinkThumb, idDrink } = drinks;
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.addEventListener("click", (e) => getDrinkDetails(e, idDrink));
  const image = document.createElement("img");
  image.src = strDrinkThumb;

  //Drink title <h3>
  const drinkTitleDiv = document.createElement("div");
  drinkTitleDiv.classList.add("drink-title");
  const title = document.createElement("h3");
  title.textContent = strDrink;

  drinkTitleDiv.append(title);
  cardDiv.append(image, drinkTitleDiv);
  drinkContainer.append(cardDiv);
}
//drink details for all the drinks by id
function getDrinkDetails(e, idDrink) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
    .then((r) => r.json())
    .then((drinks) => renderDrinkDetails(drinks.drinks[0]))
    .catch((error) => alert(error));
}
function renderDrinkDetails(drinkDetails) {
  welcomeSection.style.display = "none";
  //grid layout
  drinkDetailsContainer.style.display = "grid";
  //replaceing new children text node
  drinkContainer.replaceChildren();
  selectionH1.textContent = "";

  //Trim method remove empty spaces
  function parseIngredients(drink) {
    const ingredientArray = [];

    for (let i = 1; i < 21; i++) {
      let measure = drink["strmeasure" + i.toString()];
      let ingredient = drink["strIngredient" + i.toString()];

      if (!ingredient || ingredient === null) {
        ingredient = "";
        measure = "";
        continue;
      }
      //if ingredient and measure is defined trim down empty spaces.
      let ingredientString =
        (measure ? measure.trim() : "") +
        " " +
        (ingredient ? ingredient.trim() : "");
      ingredientArray.push(ingredientString);
    }

    return ingredientArray;
  }

  const {
    strDrink: drink,
    strCategory: category,
    strDrinkThumb: image,
    strInstructions: directions,
    strVideo: videoLink,
  } = drinkDetails;

  const title = document.createElement("p");
  title.textContent = drink;
  let titleArea = document.querySelector(".drink-details-title");
  //replaceing new children text title
  titleArea.replaceChildren();
  titleArea.append(title);

  const imageArea = document.querySelector(".drink-details-image");
  const drinkImage = document.createElement("img");
  drinkImage.src = image;
  drinkImage.alt = `Image for ${drink} `;
  //replaceing new children img
  imageArea.replaceChildren();
  imageArea.append(drinkImage);

  // ingredients <p>
  const ingredients = parseIngredients(drinkDetails);
  const ingredientPs = ingredients.map((ingredient) => {
    const ingredientP = document.createElement("p");
    ingredientP.textContent = ingredient;
    return ingredientP;
  });

  // ingredients content <h3>
  const ingredientsArea = document.querySelector(".drink-details-ingredients");
  const ingredientsTitle = document.createElement("h3");
  ingredientsTitle.textContent = "Ingredients";
  //underline text styling
  ingredientsTitle.style.textDecoration = "underline";
  //replaceing new children text node ingredients
  ingredientsArea.replaceChildren();
  ingredientsArea.append(ingredientsTitle, ...ingredientPs);

  // directions content <h3>
  const directionsArea = document.querySelector(".drink-details-directions");
  const directionsTitle = document.createElement("h3");
  directionsTitle.textContent = "Directions";
  //underline text styling
  directionsTitle.style.textDecoration = "underline";
  //directions <p>
  const directionsP = document.createElement("p");
  //replaceing new children text node directions
  directionsArea.replaceChildren();
  directionsP.textContent = directions;
  directionsArea.append(directionsTitle, directionsP);

  // preparation video hyperlink <a>
  const youTubeLinkATag = document.createElement("a");
  youTubeLinkATag.href = videoLink;
  youTubeLinkATag.target = "_blank";
  youTubeLinkATag.text = `How to make ${drink} on YouTube.`;
  //drink categories elements <p>
  const drinkCategory = document.createElement("p");
  drinkCategory.textContent = `(Drink: ${drink}, Category: ${category})`;
  const resourcesArea = document.querySelector(".drink-details-resources");
  //replaceing new children text node video links
  resourcesArea.replaceChildren();
  resourcesArea.append(youTubeLinkATag, drinkCategory);
}

// main title click function brings back to welcome message page
function showWelcome() {
  drinkDetailsContainer.style.display = "none";
  drinkContainer.style.display = "none";
  welcomeSection.style.display = "grid";
  selectionH1.textContent = "";
}
