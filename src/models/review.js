require("dotenv").config();
const axios = require("axios");

exports.details = async (id, data) => {
  //id, author, content, created_at, media_id, media_title, media_type, updated_at, url
  await axios
    .get(`${process.env.API}/review/${id}?api_key=${process.env.APIKEY}`)
    .then((results) => {
      return data(results.data);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};
