require("dotenv/config");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const { catchResourceNotFound, catchInternalServerError } = require("./helpers/handleError.helper");
const TrainingService = require("./services/training.service");
const app = express();

// init static path
app.use(express.static(__dirname + "/assets/upload"));

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init db
require("./dbs/init.mongodb");

// init routes
app.use(require("./routes"));

// TrainingService.start(`http://localhost:5000/1711466997963.webp`);

// handling error
app.use(catchResourceNotFound);
app.use(catchInternalServerError);

module.exports = app;
