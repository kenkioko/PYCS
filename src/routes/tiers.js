import express from "express";

import { findAge, formatDate } from "../lib/date.js";
import { getGradeTiers } from "../lib/grade.js";

// initialize router
const router = express.Router();

// GET grading tiers given age or date of birth
router.get('/', async (req, res) => {
  const dateOfBirth = formatDate(req.query.DateOfBirth, 'YYYY-MM-DD', 'YYYY-DD-MM');
  const age = findAge(dateOfBirth, 'YYYY-DD-MM');

  // Get grade tiers
  const grades = await getGradeTiers(age);

  res.status(200).json({ 
    Message: 'Successfully fetched grades',
    GradesOutPut: grades
  });
});

export default router;
