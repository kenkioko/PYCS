// import { data } from "./dataset.js";
// import { computeKYCScore } from "./lib/kyc.js";
// import { computeGradeScore, getGradeTiers } from "./lib/grade.js";

// console.log(computeKYCScore(data));
// console.log(computeGradeScore(data));
// console.log(await getGradeTiers(22));

import * as dotenv from 'dotenv';
import express from "express";

// app routes
import indexRouter from "./routes/index.js";

// initialize dotenv
dotenv.config();

// initialize the express app
const app = express()
app.use(express.static('public'));

// port from environment
const port = process.env.PORT || '3000';

// set app routes
app.use('/', indexRouter);

// listen on provided port, on all network interfaces.
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`)
})
