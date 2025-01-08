import Invite from '../models/invite.model.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

export const sendInvite = async (req, res, next) => {
  dotenv.config()

  const { email } = req.body;

  if (!email) {
    return next(errorHandler(400, 'Email is required'));
  }


  try {
    // Generate a unique token
    const token = crypto.randomBytes(20).toString('hex');

    const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const newInvite = new Invite({ email, token, expirationTime });
    await newInvite.save();

    // Send the invite email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: '"Mashimoni CC" <info@mashimonicc.com>',
      to: email,
      subject: 'You are Invited!',
      text: `Click here to sign up: https://mashimoni-cc.onrender.com/sign-up?token=${token}`,
    });

    res.json('Invite sent successfully');
  } catch (error) {
    next(error);
  }
};
