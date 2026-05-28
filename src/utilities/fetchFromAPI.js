import axios from "axios";

const BASE_URL = 'https://spotify23.p.rapidapi.com/search/'

const options = {
//   url: BASE_URL,
  params: {
    numberOfTopResults: '5'
  },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
    'x-rapidapi-host': 'spotify23.p.rapidapi.com',
    'Content-Type': 'application/json'
  }
};

export const fethFromAPI = async (url) => {
    await axios.get(`${BASE_URL}/${url}`)
}