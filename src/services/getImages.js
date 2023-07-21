import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '9122538-3a80db5de562f69d26380f61e';
const perPage = 12;

export const getImages = async (query, page) => {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response.data;
};
