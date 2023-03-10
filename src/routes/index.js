import express from "express";

// initialize router
const router = express.Router();

// GET testing web page
router.get('/', function (req, res, next) {
  res.render('index', {
    title: process.env.APP_NAME
  });
});

export default router;
