import fs from "fs";
import xml2js from "xml2js";

/**
 * function to read and parse the XML file
 * 
 * @param {*} filePath 
 * @returns 
 */
export const readXMLFile = (filePath) => {
    return new Promise((resolve, reject) => {
        // read the file
        fs.readFile(filePath, 'utf8', (err, data) => {
            // check for errors
            if (err) {
                return reject(err);
            }

            // parse the file
            xml2js.parseString(data, (err, result) => {
                // check for errors
                if (err) {
                    return reject(err);
                }

                // return the result object
                resolve(result);
            });
        });
    });
};


/**
 * function to write the XML file
 * @param {*} XMLData 
 * @param {*} filePath 
 * @param {*} dataType 
 * @returns 
 */
export const writeXMLFile = (XMLData, filePath, dataType = 'string') => {
    return new Promise((resolve, reject) => {
        //convert XML data to an XML Buffer
        const builder = new xml2js.Builder();
        switch (dataType) {
            case 'string':
                xml2js.parseString(XMLData, (err, data) => {
                    // check for errors
                    if (err) {
                        return reject(err);
                    }

                    XMLData = builder.buildObject(data);
                });
                break;

            case 'object':
                XMLData = builder.buildObject(XMLData);
                break;

            case 'file':
                XMLData = XMLData.buffer;
                break;

            default:
                break;
        };

        // Save the XML data to a file
        fs.writeFile(filePath, XMLData, (err) => {
            // check for errors
            if (err) {
                return reject(err);
            }

            // return the scores and grades
            resolve();
        });
    });
};