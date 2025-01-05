import Invite from '../models/invite.model.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const sendInvite = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(errorHandler(400, 'Email is required'));
  }


  try {
    // Generate a unique token
    const token = crypto.randomBytes(20).toString('hex');

    // Set an expiration time (e.g., 24 hours from now)
    const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Save the invite token to the database
    const newInvite = new Invite({ email, token, expirationTime });
    await newInvite.save();

    // Send the invite email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your-email@example.com',
        pass: 'your-email-password',
      },
    });

    await transporter.sendMail({
      from: '"Your Website" <your-email@example.com>',
      to: email,
      subject: 'You are Invited!',
      text: `Click here to sign up: https://yourwebsite.com/signup?token=${token}`,
    });

    res.json('Invite sent successfully');
  } catch (error) {
    next(error);
  }
};
