import express from "express";
import * as dotenv from 'dotenv';

import { data } from "../data/dataset.js";
import { formatDate } from "../lib/date.js";
import { computeKYCScore } from "../lib/kyc.js";
import { computeGradeScore } from "../lib/grade.js";

// initialize dotenv
dotenv.config();

// initialize router
const router = express.Router();

// GET customer data
router.get('/', function (req, res, next) {
  res.status(200).json({
    Message: "Post customer's data With fields",
    Fields: {
      "DateOfBirth": "YYYY-MM-DD",
      "Email": "example@email.com",
      "IdNumber": "12345678",
      "Name": "John Doe",
      "Phone": "xxxxxxxxxxxx"
    }
  });
});

// POST customer data
router.post('/', (req, res) => {
  // Get DataSet1 from request
  const customerData = req.body;
  customerData.DateOfBirth = formatDate(customerData.DateOfBirth, 'YYYY-MM-DD', 'YYYY-DD-MM');

  // compute credit score
  data.DataSet1 = customerData;
  const kycScore = computeKYCScore(data);
  const gradeScore = computeGradeScore(data);
  const creditScore = kycScore + gradeScore;

  // return the creditScore as JSON
  res.status(201).json({
    Message: 'Successfully computed credit score',
    CustomerData: customerData,
    CreditScore: creditScore
  });
});

export default router;
