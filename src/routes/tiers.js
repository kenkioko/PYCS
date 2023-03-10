import express from "express";
import multer from "multer";

import { findAge, formatDate } from "../lib/date.js";
import { getGradeTiers, setGradeTiers } from "../lib/grade.js";

// initialize router
const router = express.Router();

// for parsing multipart/form-data
const upload = multer();

// GET grading tiers given age or date of birth
router.get('/', async (req, res) => {
  const dateOfBirth = formatDate(req.query.DateOfBirth, 'YYYY-MM-DD', 'YYYY-DD-MM');
  const age = findAge(dateOfBirth, 'YYYY-DD-MM');

  try {
    // Get grade tiers
    const grades = await getGradeTiers(age);

    res.status(200).json({
      Message: 'Successfully fetched grades',
      GradesOutPut: grades
    });
  } catch (err) {
    res.status(500).json({
      Message: 'Error reading XML data',
    });
  }
});

router.post('/', upload.single('XMLFile'), async (req, res) => {
  const XMLType = req.query.XMLType;
  const XMLData = req.body ?? null;
  const XMLFile = req.file ?? null;

  try {
    await setGradeTiers({
      data: XMLData,
      file: XMLFile
    }, XMLType);

    // success message
    res.status(201).json({
      Message: 'Grading tiers XML saved',
    });
  } catch (error) {
    res.status(500).json({
      Message: 'Error saving XML data',
    });
  }

});

export default router;
