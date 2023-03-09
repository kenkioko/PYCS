import fs from "fs";
import xml2js from "xml2js";
import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

/**
 * grading tiers xml file path
 */
const filePath = process.env.XML_FILE_PATH;

/**
 * function to compute the grade score
 * @param {*} data 
 * @returns 
 */
export const computeGradeScore = (data) => {
    const { DataSet3 } = data;

    // weights for the grades
    const gradeScale = {
        AA: 1,
        BB: 0.9,
        CC: 0.8,
        DD: 0.7,
        EE: 0.6,
        FF: 0.6,
        GG: 0.5,
        HH: 0.4
    };

    // grade score probability
    const grade = DataSet3.Grade.toUpperCase();
    const weight = gradeScale.hasOwnProperty(grade)
        ? gradeScale[grade]
        : 0;

    // // probability from dataset
    // // Not sure how to use
    // const probability = DataSet3.Probability 
    //     ? DataSet3.Probability / 100
    //     : 1;

    // return (weight * probability) * 60;

    // amounts to 60%
    return weight * 60;
}

/**
 * function to read and parse the XML file
 * 
 * @param {*} filePath 
 * @returns 
 */
const readXMLFile = (filePath) => {
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

                // restructure the scores and grades
                const scores = [];
                const tiers = result.Tier.ScoreOutputGrades;
                tiers.forEach(tier => {
                    tier.Score.forEach(score => {
                        const { LowerAgeLimit, UpperAgeLimit, GradesOutPut } = score['$'];

                        scores.push({
                            LowerAgeLimit: LowerAgeLimit,
                            UpperAgeLimit: UpperAgeLimit,
                            GradesOutPut: GradesOutPut.split(','),
                        });
                    })
                });

                // return the scores and grades
                resolve(scores);
            });
        });
    });
};

/**
 * function to get grading tiers from age
 * @param {*} age 
 * @returns 
 */
export const getGradeTiers = async (age) => {
    const grades = [];

    try {
        // scores from XML file
        const scores = await readXMLFile(filePath);
        scores.forEach(score => {
            if (age >= score.LowerAgeLimit && age <= score.UpperAgeLimit) {
                grades.push(...score.GradesOutPut);
            }
        });
    } catch (err) {
        console.error(err);
    }

    return grades;
}