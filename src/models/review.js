require("dotenv").config();
const axios = require("axios");

exports.details = async (id, data) => {
  //id, author, content, created_at, media_id, media_title, media_type, updated_at, url
  const detail = await axios.get(
    `${process.env.API}/review/${id}?api_key=${process.env.APIKEY}`
  );

  try {
    return data(detail.data);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};
