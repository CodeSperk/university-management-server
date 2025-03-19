import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', //smtp host for gmail
    port: 587, //gmail smtp port
    secure: config.node_env === 'production',
    auth: {
      user: 'inbx.mahbub@gmail.com',
      pass: 'axic khkr nrwu zbnt', //app password from gmail
    },
  });

  await transporter.sendMail({
    from: 'inbx.mahbub@gmail.com', // sender address
    to: to, // list of receivers
    subject: 'Reset Your Password withing 10 minutes', // Subject line
    text: '', // plain text body
    html: html, // html body
  });
};
