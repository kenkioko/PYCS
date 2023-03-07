import * as stringSimilarity from "string-similarity";
import findAge from "./age.js";

/**
 * function to compute the KYC score
 * @param {*} data 
 * @returns 
 */
export const computeKYCScore = (data) => {
    const { DataSet1, DataSet2 } = data;
    const maxScore = 40;
    let score = 0;

    // Id numbers must match
    if (DataSet1.IdNumber === DataSet2.IdNumber) {
        score += 10;
    }

    // must be over 22 years of age
    const dob = (DataSet1.DateOfBirth === DataSet2.DateOfBirth) 
        ? DataSet1.DateOfBirth 
        : null;

    const age = findAge(dob);
    if (age >= 22) {
        score += 10;
    }

    // names should match at least 70%
    const name1 = DataSet1.Name.toLowerCase();
    const name2 = DataSet2.Name.toLowerCase();
    const nameSimilarity = stringSimilarity.compareTwoStrings(name1, name2);
    if (nameSimilarity >= 0.7) {
        score += 10;
    }

    // one mobile number must match
    const phones1 = Array.isArray(DataSet1.Phone) 
        ? [...DataSet1.Phone] 
        : [DataSet1.Phone];
        
    const phones2 = Array.isArray(DataSet2.Phone) 
        ? [...DataSet2.Phone] 
        : [DataSet2.Phone];
        
    const matchedPhones = phones1.filter(phone1 => phones2.includes(phone1));
    if (matchedPhones.length > 0) {
        score += 10;
    }

    // amounts to 40%
    return (score / maxScore) * 40;
}

export default computeKYCScore;