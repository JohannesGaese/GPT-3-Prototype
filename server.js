const path = require("path");
const http = require("http");
const express = require("express");
const expressStaticGzip = require("express-static-gzip");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");



require("dotenv").config();

const app = express();
const PORT =  process.env.PORT || 5000; 

app.use(cors());
app.use(express.json());

//const corsOptions = {
//    origin: true,
//    credentials: true,
//  };
//app.use(cors(corsOptions));
//app.options("*", cors());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established")
})


app.use("/api/donations", require("./routes/donations"));
//app.listen(PORT, () => {
//    console.log(`server on: ${PORT}`)
//});


app.use(expressStaticGzip("client/build"));
app.use(express.static("client/build"));
app.get(`*`, (req, res) =>
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
);

const server = http
  .createServer(app)
  .listen(PORT, function () {
    console.log(`Server running on port ${PORT}.`);
  })
  .on("error", console.log);

module.exports = server; // export needed for automatic testing via mocha