const drinkSelect = document.querySelector("#drinks");

getDrinks();

function getDrinks() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
    .then((r) => r.json())
    .then((drinks) => renderDrinksOptions(drinks))
    .catch();
}

function renderDrinksOptions(drinks) {}
