import express from "express";

// initialize router
const router = express.Router();

// GET grading tiers given age or date of birth
router.get('/', (req, res) => {
  const dateOfBirth = new Date(req.query.dateOfBirth);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - dateOfBirth.getFullYear();
  let grade;

  if (age >= 18 && age <= 25) {
    grade = 'Grade A';
  } else if (age > 25 && age <= 35) {
    grade = 'Grade B';
  } else if (age > 35) {
    grade = 'Grade C';
  } else {
    grade = 'Not eligible';
  }

  res.status(200).json({ grade });
});

export default router;
