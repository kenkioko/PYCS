import { data } from "./dataset.js";
import { computeKYCScore } from "./lib/kyc.js";
import { computeGradeScore, getGradeTiers } from "./lib/grade.js";

console.log(computeKYCScore(data));
console.log(computeGradeScore(data));
console.log(await getGradeTiers(22));
