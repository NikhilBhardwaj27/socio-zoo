const express = require("express");
const router = express.Router();
const User = require("../../modals/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const {
  registerValidation,
  loginValidation,
} = require("../validation/validation");

/* @Route -- /api/users
   @Access -- Public
   @Method -- POST           
*/
router.post("/", async (req, res) => {
  // Destructuring request body
  const { username, email, password } = req.body;

  // Validation of User
  const { error } = registerValidation(req.body);
  if (error) {
    const err = error.details[0].message;
    return res.status(400).json({ message: err });
  }

  try {
    // if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Setting gravatar
    const url = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const _user = new User({
      username: username,
      email: email,
      avatar: url,
      password: hash,
    });

    // Saving to database
    const result = await _user.save();

    res.status(200).send(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

/* @Route --  /api/users/login
   @Access -- Public
   @Method -- POST         
*/
router.post("/login", async (req, res) => {
  // Destructuring request body
  const { email, password } = req.body;

  // Validation of User
  const { error } = loginValidation(req.body);
  if (error) {
    const err = error.details[0].message;
    return res.status(400).json({ message: err });
  }

  try {
    // if user not exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User do not exists" });
    }

    // Load hash from your password DB.
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    // generating jwt token
    jwt.sign(payload, process.env.KEY, { expiresIn: 36000 }, (err, token) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send({ token: "bearer " + token });
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

/* @Route --  /api/users/current_user
   @Access -- Public
   @Method -- GET
*/
router.get(
  "/current_user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("authenticated");
    const body = {
      id: req.user.id,
      username: req.user.username,
      avatar: req.user.avatar,
      email: req.user.email,
    };
    try {
      res.status(200).json(body);
    } catch (err) {
      console.log("error" + err);
    }
  }
);

module.exports = router;
