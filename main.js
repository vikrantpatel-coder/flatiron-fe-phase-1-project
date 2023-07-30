const categorySelect = document.querySelector("#categories");
const alcoholSelect = document.querySelector("#alcohol");
const glassSelect = document.querySelector("#glass");
const drinkContainer = document.querySelector(".drink-container");

getCategories();
getAlcohol();
getGlass();

//drink categories dropdown menu
function getCategories() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
    .then((r) => r.json())
    .then((categories) => renderCategoriesOptions(categories.drinks))
    .catch((error) => alert(error));
}
//cocktail alcohol base drink dropdown
function getAlcohol() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
    .then((r) => r.json())
    .then((categories) => renderAlcoholOptions(categories.drinks))
    .catch((error) => alert(error));
}
//drink bu glass type dropdown
function getGlass() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list")
    .then((r) => r.json())
    .then((glass) => renderGlassOptions(glass.drinks))
    .catch((error) => alert(error));
}
//rendering Categories list into select categories dropdown
function renderCategoriesOptions(categories) {
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.strCategory;
    option.textContent = category.strCategory;
    categorySelect.append(option);
  });
}
//rendering alcoholic/non-alcoholic category list dropdown
function renderAlcoholOptions(categories) {
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.strIngredient1;
    option.textContent = category.strIngredient1;
    alcoholSelect.append(option);
  });
}
//rendering glass types dropdown
function renderGlassOptions(glass) {
  glass.forEach((glass) => {
    const option = document.createElement("option");
    option.value = glass.strGlass;
    option.textContent = glass.strGlass;
    glassSelect.append(option);
  });
}
//eventlistners
categorySelect.addEventListener("change", getDrinksByCategories);
alcoholSelect.addEventListener("change", getDrinksByAlcohol);
glassSelect.addEventListener("change", getDrinksByGlass);

//categories
function getDrinksByCategories(e) {
  const category = e.target.value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((r) => r.json())
    .then((drinks) => renderAllDrinks(drinks.drinks))
    .catch((error) => alert(error));
}
//alcohol
function getDrinksByAlcohol(e) {
  const alcohol = e.target.value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${alcohol}`)
    .then((r) => r.json())
    .then((drinks) => renderAllDrinks(drinks.drinks))
    .catch((error) => alert(error));
}
//glass
function getDrinksByGlass(e) {
  const glass = e.target.value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`)
    .then((r) => r.json())
    .then((drinks) => renderAllDrinks(drinks.drinks))
    .catch((error) => alert(error));
}
//creating card for each element
function renderAllDrinks(drinks) {
  drinkContainer.replaceChildren();
  drinks.forEach((drink) => {
    renderDrinkCard(drink);
  });
  categorySelect.value = "";
  alcoholSelect.value = "";
  glassSelect.value = "";
}

function renderDrinkCard(drinks) {
  //img
  const { strDrink, strDrinkThumb, idDrink } = drinks;
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.addEventListener("click", (e) => getDrinkDetails(e, idDrink));

  const image = document.createElement("img");
  image.src = strDrinkThumb;
  //Drink title
  const title = document.createElement("h3");
  title.textContent = strDrink;

  cardDiv.append(image, title);
  drinkContainer.append(cardDiv);
}
//drink details
function getDrinkDetails(e, idDrink) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
    .then((r) => r.json())
    .then((drinks) => renderDrinkDetails(drinks.drinks[0]))
    .catch((error) => alert(error));
}
function renderDrinkDetails(drinkDetails) {
  drinkContainer.replaceChildren();

  const {
    strDrink: drink,
    strAlcoholic: alcoholic,
    strCategory: category,
    strDrinkThumb: image,
    strInstructions: directions,
    strVideo: videoLink,
  } = drinkDetails;

  const title = document.createElement("p");
  title.textContent = drink;
  let titleArea = document.querySelector(".drink-details-title");
  titleArea.replaceChildren();
  titleArea.append(title);

  const imageArea = document.querySelector(".drink-details-image");
  const drinkImage = document.createElement("img");
  drinkImage.src = image;
  drinkImage.alt = `Image for ${drink} `;
  imageArea.replaceChildren();
  imageArea.append(drinkImage);

  const ingredients = parseIngredients(drinkDetails);

  const ingredientPs = ingredients.map((ingredient) => {
    const ingredientP = document.createElement("p");
    ingredientP.textContent = ingredient;
    return ingredientP;
  });

  // ingredients content
  const ingredientsArea = document.querySelector(".drink-details-ingredients");
  const ingredientsTitle = document.createElement("h3");
  ingredientsTitle.textContent = "Ingredients";
  ingredientsTitle.style.textDecoration = "underline";
  ingredientsArea.replaceChildren();
  ingredientsArea.append(ingredientsTitle, ...ingredientPs);

  // directions content
  const directionsArea = document.querySelector(".drink-details-directions");
  const directionsTitle = document.createElement("h3");
  directionsTitle.textContent = "Directions";
  directionsTitle.style.textDecoration = "underline";
  const directionsP = document.createElement("p");
  directionsArea.replaceChildren();
  directionsP.textContent = directions;
  directionsArea.append(directionsTitle, directionsP);

  // preparation video hyperlink
  const youTubeLinkATag = document.createElement("a");
  youTubeLinkATag.href = videoLink;
  youTubeLinkATag.target = "_blank";
  youTubeLinkATag.text = `How to make ${drink} on YouTube.`;
  const drinkCategory = document.createElement("p");
  drinkCategory.textContent = `(Drink: ${drink}, Category: ${category})`;
  const resourcesArea = document.querySelector(".drink-details-resources");
  resourcesArea.replaceChildren();
  resourcesArea.append(youTubeLinkATag, drinkCategory);
}

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

    let ingredientString =
      (measure ? measure.trim() : "") +
      " " +
      (ingredient ? ingredient.trim() : "");
    ingredientArray.push(ingredientString);
  }

  return ingredientArray;
}
