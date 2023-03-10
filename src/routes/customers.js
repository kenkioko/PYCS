import express from "express";
import * as dotenv from 'dotenv';

import { data } from "../data/dataset.js";
import { computeKYCScore } from "../lib/kyc.js";
import { computeGradeScore } from "../lib/grade.js";

// initialize dotenv
dotenv.config();

// initialize router
const router = express.Router();

// GET customer page
router.get('/', function (req, res, next) {
  res.render('customer', {
    title: process.env.APP_NAME
  });
});

// POST customer data
router.post('/', (req, res) => {
  // Get DataSet1 from request
  const customerData = req.body;
  data.DataSet1 = customerData;

  // compute credit score
  const kycScore = computeKYCScore(data);
  const gradeScore = computeGradeScore(data);
  const creditScore = kycScore + gradeScore;

  // return the creditScore as JSON
  res.status(201).json({
    message: 'Successfully computed credit score',
    data: {
      CustomerData: customerData,
      CreditScore: creditScore
    }
  });
});

export default router;
