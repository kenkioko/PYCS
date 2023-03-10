import * as dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import bodyParserXML from "body-parser-xml";

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

// parse application/xml
app.use(bodyParser.text({ type: 'application/xml' }));

bodyParserXML(bodyParser);
app.use(bodyParser.xml({
  limit: '1MB',   // Reject payload bigger than 1 MB
  xmlParseOptions: {
    normalize: true,     // Trim whitespace inside text nodes
    normalizeTags: true, // Transform tags to lowercase
    explicitArray: false // Only put nodes in array if >1
  }
}));

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
