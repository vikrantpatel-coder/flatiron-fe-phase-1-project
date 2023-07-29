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
    .then((drinks) => console.log(drinks.drinks))
    .catch((error) => alert(error));
}
