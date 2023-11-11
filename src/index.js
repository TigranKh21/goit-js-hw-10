import SlimSelect from 'slim-select';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const refs = {
  selectEl: document.getElementById('mySelect'),
  markupEl: document.querySelector('.cat-info'),
};
const { TheCatAPI } = require('@thatapicompany/thecatapi');

const MY_API_KEY =
  'live_IXrVe8p22GR9cDuw6rHaWFqK7NKVsZFoi0WqQxAzF9wFr1ROVWPb4WQlTevMOBzU';
const theCatAPI = new TheCatAPI(MY_API_KEY);

//const selectedArr = fetchBreeds();
/* .map(({ name, id, url, description }) => {
  return name, id, url, description;
}); */

async function fetchData() {
  try {
    const data = await fetchBreeds();
    data.forEach(element => {
      const option = document.createElement('option');
      option.value = element.id;
      option.text = element.name;
      refs.selectEl.add(option);
    });
    //console.log(data);
    return data;
  } catch (error) {
    console.error('Error: ', error);
  }
}

fetchData().then(() => {
  new SlimSelect({
    select: refs.selectEl,
  });
});
//console.log(selectedArr);

/*
  .then(data => {
    data.forEach(element => {
      const option = document.createElement('option');
      option.value = element.id;
      option.text = element.name;
      refs.selectEl.add(option);
    });
    return data;
  })
  .then(data => {
    new SlimSelect({
      select: refs.selectEl,
    });
  });
*/

refs.selectEl.addEventListener('change', event => {
  const id = event.target.value;

  fetchCatByBreed(id).then(image => {
    const url = image[0].url;
    fetchData().then(data => {
      data.forEach(breed => {
        if (breed.id === id) {
          const description = breed.description;
          const name = breed.name;
          const markup = `<img src="${url}" width="800" height="auto"><span><H2>${name}</H2><p>${description}</p></span>`;
          refs.markupEl.innerHTML = markup;
        }
      });
    });
  });
});
