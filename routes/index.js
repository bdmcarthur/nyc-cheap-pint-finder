"use strict";

const {
  Router
} = require("express");
const router = Router();
const Bars = require("../models/bar");
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;
const nodemailer = require("nodemailer");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/bars", (req, res, next) => {
  Bars.find({}, (error, bars) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json({
        bars: bars
      });
    }
  });
});

// POST route from contact form
router.post("/contact", (req, res) => {
  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS
    }
  });

  // Specify what the email will look like
  const mailOpts = {
    from: "Your sender info here", // This is ignored by Gmail
    to: GMAIL_USER,
    subject: "New message from contact form at NYC Pints",
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };

  // Attempt to send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      console.log(error);
      res.redirect("/"); // Show a page indicating failure
    } else {
      console.log(response);
      res.redirect("/"); // Show a page indicating success
    }
  });
});

module.exports = router;