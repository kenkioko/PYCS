import { readXMLFile, writeXMLFile } from "./xml.js";
import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

/**
 * grading tiers xml file path
 */
const filePath = process.env.XML_FILE_PATH;


/**
 * weights for the grades
 */
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

/**
 * function to compute the grade score
 * @param {*} data 
 * @returns 
 */
export const computeGradeScore = (data) => {
    const { DataSet3 } = data;

    // grade score probability
    const grade = DataSet3.Grade.toUpperCase();
    const weight = gradeScale.hasOwnProperty(grade)
        ? gradeScale[grade]
        : 0;

    // amounts to 60%
    return weight * 60;
}

/**
 * function to get grading tiers from age
 * @param {*} age 
 * @returns 
 */
export const getGradeTiers = async (age) => {
    const grades = [];

    try {
        // read the XL file
        const XMLData = await readXMLFile(filePath);
        const tiers = XMLData.Tier.ScoreOutputGrades;

        // retrieve the scores and grades
        tiers.forEach(tier => {
            tier.Score.forEach(score => {
                const { LowerAgeLimit, UpperAgeLimit, GradesOutPut } = score['$'];
                if (age >= LowerAgeLimit && age <= UpperAgeLimit) {
                    grades.push(...GradesOutPut.split(','));
                }
            })
        });
    } catch (err) {
        console.error(err);
        throw err;
    }

    return grades;
}

/**
 * function to replace the grade tiers XML file
 * @param {*} xml 
 * @param {*} type 
 */
export const setGradeTiers = async (xml, type) => {
    // Replace the XML file
    try {
        // string or object
        if (type === 'data') {
            await writeXMLFile(xml.data, filePath, typeof xml.data);
        }

        // file buffer
        else {
            await writeXMLFile(xml.file, filePath, 'file');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}