require("dotenv").config();
const axios = require("axios");

exports.details = async (id, data) => {
  // returns keyword name
  const detail = await axios.get(
    `${process.env.API}/keyword/${id}?api_key=${process.env.APIKEY}`
  );

  try {
    return data(detail.data.name);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};

exports.movie = async (id, data) => {
  // returns movie id
  const movie = await axios.get(
    `${process.env.API}/keyword/${id}/movies?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < movie.data.results.length; i++) {
      result.push(movie.data.results[i].id);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};
