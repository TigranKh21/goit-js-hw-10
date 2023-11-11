import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_IXrVe8p22GR9cDuw6rHaWFqK7NKVsZFoi0WqQxAzF9wFr1ROVWPb4WQlTevMOBzU';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

//const BASE_URL = 'https://api.thecatapi.com/v1/';
const END_POINT_BREEDS = 'breeds/';
const END_POINT_IMAGES = 'images/search';
const OPTIONS = {
  'x-api-key':
    'live_IXrVe8p22GR9cDuw6rHaWFqK7NKVsZFoi0WqQxAzF9wFr1ROVWPb4WQlTevMOBzU',
};
/*
export function fetchBreeds() {
  return fetch(`${BASE_URL}${END_POINT_BREEDS}`, OPTIONS).then(res =>
    res.json()
  );
}
*/

/*
export function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}${END_POINT_IMAGES}?breed_ids=${breedId}`,
    OPTIONS
  ).then(res => res.json());
}
*/
//! -------------solution with axios.request---------------- //
/*
function getSelectionArr() {
  axios.request({
    url: 'breeds/',
    baseURL: 'https://api.thecatapi.com/v1/',
    method: 'GET',
    headers: {
      'x-api-key':
        'live_IXrVe8p22GR9cDuw6rHaWFqK7NKVsZFoi0WqQxAzF9wFr1ROVWPb4WQlTevMOBzU',
    },
    transformResponse: [
      function (data) {
        console.log(data);
        return data;
      },
    ],
  });
} 
*/

//! -------------solution with axios---------------- //

export async function fetchBreeds() {
  const url = END_POINT_BREEDS;
  const res = await axios.get(url);
  return res.data;
}

export async function fetchCatByBreed(breedId) {
  const params = breedId;
  const url = END_POINT_IMAGES;
  const res = await axios.get(url, params);
  return res.data;
}
