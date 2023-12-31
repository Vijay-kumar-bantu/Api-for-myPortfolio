const express = require("express");
const nodemailer = require("nodemailer");
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("api started");
});

app.post("/sendmail", (req, res) => {
  const { mailid, name, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailoptions = {
    from: process.env.MAIL_ID,
    to: process.env.MAIL_ID,
    subject: `Message from ${name} and ${mailid} from portfolio`,
    text: `From: ${name}\nEmail: ${mailid}\n\nMessage: ${message}`,
  };

  try {
    transporter.sendMail(mailoptions, (err, info) => {
      if (err) return res.status(500).send(err);
      res.send(info);
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// app.listen(process.env.PORT, () => console.log("server started"));

module.exports = app;
