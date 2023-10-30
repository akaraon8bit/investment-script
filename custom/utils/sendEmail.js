const nodemailer = require("nodemailer");
const logger = require("./logger");

const sendEmail = async (to, subject, text, html, company) => {
  try {
    let transporter = nodemailer.createTransport({
      host: company.emailSetup.host,
      port: company.emailSetup.port,
      secure: company.emailSetup.secure,
      auth: {
        user: company.emailSetup.auth.user,
        pass: company.emailSetup.auth.pass,
      },
    });

    let info = await transporter.sendMail({
      from: company.emailSetup.from, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    return `"Message sent: %s", ${info.messageId})`;
  } catch ({ message }) {
    logger.error(message);
  }
};

module.exports = sendEmail;
