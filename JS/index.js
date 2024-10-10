'use strict';
//* HTML element
let cardNews = document.querySelector('.card-news');
let linkCountry = document.querySelectorAll('nav .nav-link');
let linkCatagery = document.querySelectorAll('aside a');
console.log(linkCatagery);

//* App Variables
let imageNotFound = '/imgs/localhost-file-not-found.jpg';
//* Functions

///* api catagre  ==> https://saurav.tech/NewsAPI/top-headlines/category/health/in.json
async function getNews(catagre, country) {
  var responsere = await fetch(
    `https://saurav.tech/NewsAPI/top-headlines/category/${catagre}/${country}.json`
  );
  console.log(responsere);
  var data = await responsere.json();
  console.log(data);
  console.log(data.articles[0].urlToImage);
  displayNews(data.articles);
}

function displayNews(arr) {
  cardNews.innerHTML = '';
  console.log(arr.length);
  for (let i = 0; i < arr.length; i++) {
    let cardNew = `
    <div class="col col-md-6 col-lg-4">
                <div class="card">
                  <img
                    src="${arr[i].urlToImage || imageNotFound}"
                    class="card-img-top w-100" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${arr[i].source.name}</h5>
                    <p class="card-text">${arr[i].description}</p>
                    <a href="${
                      arr[i].url
                    }" class="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
    `;
    cardNews.innerHTML += cardNew;
  }
}

getNews('business', 'us');

//* Events

for (let i = 0; i < linkCountry.length; i++) {
  linkCountry[i].addEventListener('click', function (e) {
    let linkCountryActive = document.querySelector('nav .active-link');
    linkCountryActive.classList.remove('active-link');
    e.target.classList.add('active-link');
    let countryCode = e.target.getAttribute('data-country');
    getNews('business', countryCode);
    console.log(countryCode);
  });
}
for (let i = 0; i < linkCatagery.length; i++) {
  linkCatagery[i].addEventListener('click', function (e) {
    let linkCatageryActive = document.querySelector('aside .active-link');
    linkCatageryActive.classList.remove('active-link');
    e.target.parentElement.classList.add('active-link');
    console.log(e.target);
    console.log(linkCatageryActive);
  });
}
