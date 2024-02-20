const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "skrypnyk07@meta.ua",
      pass: process.env.META_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(nodemailerConfig);
  const emailOptions = { ...data, from: "skrypnyk07@meta.ua" };

  transporter
    .sendMail(emailOptions)
    .then(() => console.log("Email send success!".green.bold))
    .catch((err) => console.log(err.message));
};

module.exports = sendEmail;
