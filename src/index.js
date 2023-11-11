import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const refs = {
  selectEl: document.getElementById('mySelect'),
  markupEl: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.js-wrapper'),
};
const { TheCatAPI } = require('@thatapicompany/thecatapi');

const MY_API_KEY =
  'live_IXrVe8p22GR9cDuw6rHaWFqK7NKVsZFoi0WqQxAzF9wFr1ROVWPb4WQlTevMOBzU';
const theCatAPI = new TheCatAPI(MY_API_KEY);

async function fetchData() {
  try {
    refs.loaderEl.classList.remove('is-hidden');
    const data = await fetchBreeds();
    const breeds = data.map(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      return option;
    });
    refs.selectEl.append(...breeds);
  } catch (error) {
    onError();
  } finally {
    refs.loaderEl.classList.add('is-hidden');
  }
}

fetchData().then(() => {
  new SlimSelect({
    select: refs.selectEl,
  });
});

refs.selectEl.addEventListener('change', event => {
  const id = event.target.value;
  refs.loaderEl.classList.remove('is-hidden');

  fetchCatByBreed(id)
    .then(image => {
      const url = image[0].url;
      const description = image[0].breeds[0].description;
      const name = image[0].breeds[0].name;
      const temperament = image[0].breeds[0].temperament;
      const markup = `<img src="${url}" width="800" height="auto">
    <div>
      <H2>${name}</H2>
      <p>${description}</p>
      <p class="js-temp-header">Temperament:&nbsp<span>${temperament}</span></p>
    </div>`;
      refs.markupEl.innerHTML = markup;
    })
    .catch(() => onError())
    .finally(() => {
      refs.loaderEl.classList.add('is-hidden');
    });
});

function onError() {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
