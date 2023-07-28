const cocktailSelect = document.querySelector("#cocktails");
const categorySelect = document.querySelector("#categories");
const alcoholSelect = document.querySelector("#alcohol");

getDrinks();
getCategories();
getAlcohol();
//fetching all the cocktail drinks
function getDrinks() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
    .then((r) => r.json())
    .then((drinks) => renderDrinkOptions(drinks.drinks))
    .catch((error) => alert("Sober Up!"));
}
//drink categories dropdown menu
function getCategories() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
    .then((r) => r.json())
    .then((categories) => renderCategoriesOptions(categories.drinks))
    .catch((error) => alert(error));
}
//fetching cocktail alcohol base
function getAlcohol() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
    .then((r) => r.json())
    .then((categories) => renderAlcoholOptions(categories.drinks))
    .catch((error) => alert(error));
}

//rendering Drinks into Select a Drink dropdown
function renderDrinkOptions(drinks) {
  drinks.forEach((drinks) => {
    const option = document.createElement("option");
    option.value = drinks.strDrink;
    option.textContent = drinks.strDrink;
    cocktailSelect.append(option);
  });
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
