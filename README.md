# Credit Score Calculator

This project is an interview assessment for a software engineering job. It is a Node.js application that is used for calculating a customer's credit score using the KYC customer data and a set of grading weights.

## Dependencies

This project uses the following dependencies:

* **body-parser**: Used for parsing incoming request bodies in a middleware before the handlers, available under the `req.body` property.
* **body-parser-xml**: Used for parsing XML requests and making it available under the `req.body` property.
* **dotenv**: Used for loading environment variables from a `.env` file into `process.env`.
* **ejs**: Used for templating and generating HTML markup with plain JavaScript.
* **express**: Used as the web framework.
* **moment**: Used for parsing, validating, manipulating and displaying dates and times.
* **multer**: Used for uploading files.
* **string-similarity**: Used for calculating the similarity between two strings.
* **xml2js**: Used for parsing XML and converting it to JavaScript objects.


## Setup

To run this project you need to install the dependencies using the `npm` package manager.

After that you need to create a `.env` file with the following variables. There is a `.env.example` file for guidance:

* `APP_NAME`: Name of the app
* `PORT`: Server listening port, defaults to 3000
* `XML_FILE_PATH`: Path to the grading tiers XML file

## Available Scripts

Finally, run the script `npm start` to start the server.

## Testing

For testing, there is a Postman collection and also a web app that can be accessed through the browser by following the listening host:port.