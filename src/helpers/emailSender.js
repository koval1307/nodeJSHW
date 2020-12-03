const sgMail = require("@sendgrid/mail");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "./.env") });
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendVerificationEmail = async (email, verificationToken) => {
  try {
    const msg = {
      to: email,
      from: "johnmalkovich657@gmail.com",
      subject: "Email Verification",
      text: "Verification",
      html: `<p>Please verify your account,</p><a href="http://localhost:${process.env.PORT}/auth/verify/${verificationToken}" target="_blank">link</a>`,
    };
    await sgMail.send(msg);
    console.log("Email send");
  } catch (error) {
  }
};

