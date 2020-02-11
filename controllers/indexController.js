let axios = require("axios");

exports.index = (req, res) => {
  res.json({
    success: true,
    msg: "Api working!"
  });
};
//Should abstract the api call to a service
exports.getCountryData = async (req, res) => {
  //keys should be put on a .env file
  const { lat, lng } = req.query;
  console.log(lat, lng);
  try {
    console.log(process.env.GOOGLE_API_KEY);
    const data = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`
    );
    const dataDarkly = await axios.get(
      `https://api.darksky.net/forecast/dccd4d90432c26ca65d85fba5e382a90/${lat},${lng}?exclude=minutely,hourly,daily,alerts,flags`
    );
    console.log(data.data);
    if (data.status === 200 || dataDarkly.status === 200)
      res.json({
        success: true,
        dataCountry: data.data.results[0].address_components,
        dataDarkly: dataDarkly.data.currently
      });
    else
      res.json({
        success: false
      });
  } catch (err) {
    res.json({ err });
  }
};
