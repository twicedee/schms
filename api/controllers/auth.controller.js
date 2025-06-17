/**
 * The code snippet contains functions for user signup, signin, and Google authentication using JWT
 * tokens and bcrypt for password hashing.
 * @param req - The `req` parameter in your code represents the request object in Express.js. It
 * contains information about the HTTP request such as the request headers, body, parameters, query
 * strings, etc.
 * @param res - The `res` parameter in your code refers to the response object in Express.js. It is
 * used to send a response back to the client making the request. In your code, you are using `res` to
 * send JSON responses and set cookies in the response headers.
 * @param next - The `next` parameter in your code refers to the next middleware function in the
 * application's request-response cycle. It is a function that is called to pass control to the next
 * middleware function. In your code, `next` is used to handle errors and pass them to the error
 * handling middleware.
 */
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import Invite from '../models/invite.model.js'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { firstName, initials, lastName, username, email, password } = req.body;

  if (
    !initials ||
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === '' ||
    initials === '' ||
    firstName === '' ||
    lastName === ''
  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  try {

    // const invite = await Invite.findOne({ token, email });

    // if (!invite) {
    //   return next(errorHandler(400, 'Invalid or expired invite token'));
    // }

    // if (invite.isUsed) {
    //   return next(errorHandler(400, 'Invite token has already been used'));
    // }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      initials,
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();


    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET, { expiresIn: "8h" }
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
