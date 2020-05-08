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
    <h4>Cuisine: ${cuisine}</h4>
    <img height=200 src="${picture}" />
    <h4>Instructions</h4>
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