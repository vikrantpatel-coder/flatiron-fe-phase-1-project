const cocktailSelect = document.querySelector("#cocktails");

getDrinks();

function getDrinks() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
    .then((r) => r.json())
    .then((drinks) => renderDrinkOptions(drinks.drinks))
    .catch();
}

function renderDrinkOptions(drinks) {
  drinks.forEach((drinks) => {
    const option = document.createElement("option");
    option.value = drinks.strDrink;
    option.textContent = drinks.strDrink;
    cocktailSelect.append(option);
  });
}
