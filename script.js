const ingredientsList = document.querySelector(".ings");
const measureList = document.querySelector(".meas");
const drinkName = document.querySelector(".drink-name");
const rerollBtn = document.querySelector(".reroll");

const getDrink = async function () {
  try {
    const response = await fetch(
      "http://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    const { drinks } = data;
    const [drink] = drinks;
    const ingredients = Object.entries(drink).filter((entry) =>
      entry[0].includes("strIngredient")
    );
    const measurements = Object.entries(drink).filter((entry) =>
      entry[0].includes("strMeasure")
    );

    //Reset Ingredients on Reload
    ingredientsList.innerHTML = "";
    measureList.innerHTML = "";

    //BG Img
    document.body.style.backgroundImage = `url(${drinks[0].strDrinkThumb})`;

    //Render Name
    drinkName.textContent = `${drinks[0].strDrink}`;

    //Render Ings
    ingredients.forEach((ing) => {
      if (!ing[1]) return;
      ingredientsList.insertAdjacentHTML("beforeend", `<li>${ing[1]}</li>`);
    });

    measurements.forEach((meas) => {
      if (!meas[1]) return;
      measureList.insertAdjacentHTML("beforeend", `<li>${meas[1]}</li>`);
    });
  } catch (err) {
    console.log(`🦜 Bird Problem: ${err}`);
  }
};

getDrink();
rerollBtn.addEventListener("click", getDrink);
