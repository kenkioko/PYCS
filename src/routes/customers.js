import express from "express";

// initialize router
const router = express.Router();

// GET customer page
router.get('/', function (req, res, next) {
  res.render('customer', { title: 'Express' });
});

// POST customer data
router.post('/', (req, res) => {
  const customerData = req.body;
  const customer = {
    DateOfBirth: customerData.DateOfBirth,
    Email: customerData.Email,
    IdNumber: customerData.IdNumber,
    Name: customerData.Name,
    Phone: customerData.Phone
  };

  res.status(201).json(customer);
});

export default router;
