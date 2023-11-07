const selectEl = document.querySelector('.breed-select');
const { TheCatAPI } = require('@thatapicompany/thecatapi');
import axios from 'axios';
const BASE_URL = 'https://api.thecatapi.com/v1/';
const END_POINT_imgSetUrl = 'images/search?limit=10';
const theCatAPI = new TheCatAPI(
  'live_vYPnJ0OEjt4G6A3LHZ3mj7I6QPG7GFl8UnqueC7ySK7sp0u4p5S11m5XYINK9qJr'
);
fetch(BASE_URL + END_POINT_imgSetUrl);

theCatAPI.images
  .searchImages({
    limit: 6,
  })
  .then(images => {
    console.log(images);
  })
  .catch(error => {
    // handle error
  });
