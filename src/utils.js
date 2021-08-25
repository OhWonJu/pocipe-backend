import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";

export const generateAccountCode = () =>
  Math.random().toString(36).substr(2, 8).toUpperCase();

const sendMail = content => {
  const options = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };
  const nodemailerMailgun = nodemailer.createTransport(mg(options));
  return nodemailerMailgun.sendMail(content);
};

export const sendSecretMail = (email, code) => {
  const content = {
    from: "pocipe_zoody@pocipe.com",
    to: email,
    subject: "Verification Code For Pocipe Account🍴",
    html: `Hello! Your Verification Code is "<strong>${code}</strong>". <br/>
            Copy Paste on the APP to Verification Your Pocipe Account!`,
  };
  return sendMail(content);
};
