// import { data } from "./dataset.js";
// import { computeKYCScore } from "./lib/kyc.js";
// import { computeGradeScore, getGradeTiers } from "./lib/grade.js";

// console.log(computeKYCScore(data));
// console.log(computeGradeScore(data));
// console.log(await getGradeTiers(22));

import * as dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

// app routes
import indexRouter from "./routes/index.js";
import customerRouter from "./routes/customers.js";
import tierRouter from "./routes/tiers.js";

// initialize dotenv
dotenv.config();

// initialize the express app
const app = express();

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
const upload = multer();
app.use(upload.array());

// static files folder
app.use(express.static('public'));

// view engine setup
app.set('views', 'views');
app.set('view engine', 'ejs');

// port from environment
const port = process.env.PORT || '3000';

// set app routes
app.use('/', indexRouter);
app.use('/customers', customerRouter);
app.use('/tiers', tierRouter);

// listen on provided port, on all network interfaces.
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});
