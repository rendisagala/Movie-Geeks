require("dotenv").config();
const axios = require("axios");

exports.details = async (id, season, episode, data) => {
  //air_date, crew, guest_stars, name, overview, id, production_code, season_number, still_path, vote_average_, vote_count
  const detail = await axios.get(
    `${process.env.API}/tv/${id}/season/${season}/episode/${episode}?api_key=${process.env.APIKEY}`
  );
  try {
    return data(detail.data);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};

exports.images = async (id, season, episode, data) => {
  const image = await axios.get(
    `${process.env.API}/tv/${id}/season/${season}/episode/${episode}/images?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < image.data.stills.length; i++) {
      result.push(`${process.env.IMAGE}${image.data.stills[i].file_path}`);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};
