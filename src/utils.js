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

export const sendAccountMail = (email, code) => {
  const content = {
    from: "pocipe_zoody@pocipe.com",
    to: email,
    subject: "Pocipe 이메일 인증 코드입니다!🍴",
    html: `안녕하세요! 이메일 인증 코드는 "<strong>${code}</strong>" 입니다. <br/>
            해당 코드를 복사하여 Pocipe 이메일 인증란에 붙여넣어주세요!`,
  };
  return sendMail(content);
};
