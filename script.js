const ingredientsList = document.querySelector(".ings");
const measureList = document.querySelector(".meas");
const drinkName = document.querySelector(".drink-name");
const rerollBtn = document.querySelector(".reroll");
const instructions =  document.querySelector(".instr")


const getDrink = async function () {
  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
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
    const ingMeasArr =[]
    console.log(ingredientsList);

    //BG Img
    document.body.style.backgroundImage = `url(${drinks[0].strDrinkThumb})`;

    //Render Name
    drinkName.textContent = `${drinks[0].strDrink}`;

    //Render Ings
    ingredients.forEach((ing) => {
      if (!ing[1]) return;
      ingMeasArr.push([ing[1]]);
    });

    measurements.forEach((meas, i) => {
      if (!meas[1]) return;
      ingMeasArr[i].push(meas[1]);
    });

  ingMeasArr.forEach(entry => {
    ingredientsList.insertAdjacentHTML("beforeend", `<li>${entry[1]? entry[1]: ""} ${entry[0]}</li>`)
  })

  console.log(drink);
instructions.textContent = drink.strInstructions
  } catch (err) {
    console.log(`🦜 Bird Problem: ${err}`);
  }
};

getDrink();
rerollBtn.addEventListener("click", getDrink);
