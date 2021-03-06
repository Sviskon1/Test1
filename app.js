const express = require("express");
const https = require("https");
const app = express();

const EXPRESS_PORT = 4000;
const url =
  "https://opendata.umea.se/api/records/1.0/search/?dataset=trad-som-forvaltas-av-gator-och-parker&q=l%C3%B6vtr%C3%A4d&facet=lov_eller_barrtrad_1_1_1&facet=tradart_vetenskap_namn_1_1_2&facet=tradart_svenskt_namn_1_1_3&facet=gatu_eller_parktrad_1_4_4";
app.get("/", function (req, res) {
  let treeData = "";

  https.get(url, function (respons) {
    console.log(respons.statusCode);

    respons.on("data", function (data) {
      treeData += data;
    });

    respons.on("end", function (data) {
      var tree = JSON.parse(treeData).parameters.q;
      console.log(tree);
      res.send("Länstyrelsen förvaltar: " + tree);
    });
  });
});
app.listen(EXPRESS_PORT, function () {
  console.log("Server is runing on port " + EXPRESS_PORT);
  console.log(
    `Server is running on port ${EXPRESS_PORT} and the URL is ${url}`
  );
});
