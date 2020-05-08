// Open the folder “Coding-Challenge-1”.
// b. This is a small app that shows the recipes of meals. You will find an application that has an
// index.html page already set up with a form, however, the JavaScript functionality in the index.js file
// is missing.
// c. Add the code that is needed so that when the user clicks the button “Get meals” and provides the
// name of a meal in the given input, you will connect to theMealDB API and from the list of results you
// will display in screen the following (This goes for every single meal in the list):
// i. Complete meal name
// ii. Meal area/cuisine
// iii. Meal’s instructions of preparation.
// iv. Meal’s picture
// d. The documentation of this API is located at: https://www.themealdb.com/api.php
// e. Use the appropriate endpoint to retrieve the recipes of the meals matching the search criteria.
// f. In case of receiving an error or zero results from the API show in screen a message with the
// following: “Meal not found”.

function getMealByName(name) {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`

  return fetch(URL)
    .then(r => r.json())
    .then(data => data.meals)
    .then(meals => meals.map(m => ({
      mealName: m.strMeal,
      cuisine: m.strArea,
      instructions: m.strInstructions,
      picture: m.strMealThumb,
     })))
     .catch(() => ([]))
}

function mealItem({ mealName, cuisine, instructions, picture }) {
  const el = document.createElement('li')
  el.innerHTML = `
    <h2>${mealName}</h2>
    <h4>${cuisine}</h4>
    <img src="${picture}" />
    <p>${instructions}</p>
  `

  return el
}

function renderMeals(meals) {
  const mealList = meals.map(m => mealItem(m))
  const list = document.body.querySelector('#resultlist')

  Array.from(mealList).forEach(m => list.appendChild(m))
}

function renderError() {
  const list = document.body.querySelector('#resultlist')
  list.innerHTML = 'Meal not found'
}

function search() {
  const query = document.body.querySelector('#query').value
  document.body.querySelector('#resultlist').innerHTML = ''

  getMealByName(query).then(meals => {
    if (meals.length == 0) {
      renderError()
    } else {
      renderMeals(meals)
    }
  })
}

document.body.querySelector('.js-search-form').onsubmit = function(ev) {
  ev.preventDefault()
  search()
}