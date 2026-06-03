import axios from "axios";

const BASE_URL = 'https://spotify23.p.rapidapi.com/search/'

const options = {
//   url: BASE_URL,
  params: {
    numberOfTopResults: '5'
  },
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
    'x-rapidapi-host': 'spotify23.p.rapidapi.com',
    'Content-Type': 'application/json'
  }
};

export const fetchFromAPI = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);

    return data
}