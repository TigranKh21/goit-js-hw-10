import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_IXrVe8p22GR9cDuw6rHaWFqK7NKVsZFoi0WqQxAzF9wFr1ROVWPb4WQlTevMOBzU';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

const END_POINT_BREEDS = 'breeds/';
const END_POINT_IMAGES = 'images/search';

export async function fetchBreeds() {
  const res = await axios.get(END_POINT_BREEDS);
  return res.data;
}

export async function fetchCatByBreed(breedId) {
  const params = new URLSearchParams({ breed_ids: breedId });
  const res = await axios.get(END_POINT_IMAGES + '?' + params);
  return res.data;
}
