const express = require("express");
const bodyParser = require("body-parser");
const couchbase = require("couchbase");
const path = require("path");
const config = require("./config");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencouded({ extended: true }));

module.exports.bucket = (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket);

app.use(express.static(path.join(__dirname, "public")));

const routes = require("./routes/routes.js")(app);

const server = app.listen(3000, () => {
  console.log("Listening on port %s...", server.address().port);
});
