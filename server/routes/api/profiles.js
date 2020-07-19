const express = require("express");
const router = express.Router();
const User = require("../../modals/user");
const Profile = require("../../modals/profile");
const passport = require("passport");
const { profile_url } = require("gravatar");
const ObjectId = require("mongodb").ObjectID;

/* @Route --  /api/profiles/user/:id
   @Access -- private
   @desc -- GET user profile  by id
*/
router.get(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Find Current User Profile
      const result = await Profile.findOne({ user: req.params.id })
        .populate("user", ["username", "avatar"])
        .populate("followers", ["username", "avatar"])
        .populate("following", ["username", "avatar"]);

      // If profile not Found
      if (!result) {
        return res.status(404).json({ message: "Profile Not Found!!!" });
      }
      res.status(200).json(result);
    } catch (error) {
      if (error.kind == "ObjectId") {
        return res.status(404).json({ message: "Profile Not Found!!!" });
      }
      res.status(500).send(error);
    }
  }
);

/* @Route --  /api/profiles
   @Access -- private
   @desc -- add and update current user profile         
*/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // Validation of Profile
    if (!req.body.relationshipStatus) {
      return res
        .status(400)
        .json({ message: "RelationShip must not be empty" });
    }

    if (!req.body.hobbies) {
      return res.status(400).json({ message: "Hobbies must not be empty" });
    }

    // Destructuring request body
    const {
      bio,
      relationshipStatus,
      birthday,
      location,
      website,
      gender,
      age,
      hobbies,
      youtube,
      linkedin,
      twitter,
      instagram,
    } = req.body;

    // Adding to Profile details object
    const profileDetails = {};

    if (bio) profileDetails.bio = bio;
    if (relationshipStatus)
      profileDetails.relationshipStatus = relationshipStatus;
    if (birthday) profileDetails.birthday = birthday;
    if (location) profileDetails.location = location;
    if (website) profileDetails.website = website;
    if (gender) profileDetails.gender = gender;
    if (age) profileDetails.age = age;
    if (hobbies) {
      profileDetails.hobbies = hobbies;
    }

    // Building Social object
    profileDetails.social = {};
    profileDetails.user = req.user.id;
    if (linkedin) profileDetails.social.linkedin = linkedin;
    if (twitter) profileDetails.social.twitter = twitter;
    if (instagram) profileDetails.social.instagram = instagram;
    if (youtube) profileDetails.social.youtube = youtube;

    try {
      //Updating the profile
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileDetails },
          { new: true }
        );
        return res.status(200).json(profile);
      }

      // Create new profile
      const user = new Profile(profileDetails);
      const result = await user.save();

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
);

/* @Route --  /api/profiles/basicDetails
   @Access -- private
   @desc -- POST update basic details      
*/
router.post(
  "/basicDetails",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { school, college, job } = req.body;

    const profileDetails = {
      school,
      college,
      job,
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      profile.basicDetails.push(profileDetails);
      profile = await profile.save();
      return res.status(200).json(profile);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

/* @Route --  /api/profiles/follow/:id
   @Access -- private
   @desc -- PUT follow functionality   
*/
router.put(
  "/follow/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let profile1 = await Profile.findOne({ user: req.params.id })
      let profile2 = await Profile.findOne({ user: req.user.id });

      profile1.followers.push(req.user.id);
      profile2.following.push(req.params.id);

      profile2 = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profile2 },
        { new: true }
      );
      profile1 = await Profile.findOneAndUpdate(
        { user: req.params.id },
        { $set: profile1 },
        { new: true }
      )
      const result = await Profile.findOne({ user: req.params.id })
        .populate("user", ["username", "avatar"])
        .populate("followers", ["username", "avatar"])
        .populate("following", ["username", "avatar"])

        res.status(200).json(result)
    } catch (error) {
      if (error.kind === "ObjectId") {
        return res.status(400).json({ message: "User not found" });
      }
      res.status(500).json(error);
    }
  }
);

/* @Route --  /api/profiles/unfollow/:id
   @Access -- private
   @desc -- PUT unfollow functionality   
*/
router.put(
  "/unfollow/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let profile1 = await Profile.findOne({ user: req.params.id })
      let profile2 = await Profile.findOne({ user: req.user.id });

      const filter1 = profile1.followers.filter((id) => id != req.user.id);
      const filter2 = profile2.following.filter((id) => id != req.params.id);

      profile1.followers = filter1;
      profile2.following = filter2;

      profile2 = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profile2 },
        { new: true }
      );

      profile1 = await Profile.findOneAndUpdate(
        { user: req.params.id },
        { $set: profile1 },
        { new: true }
      );
        console.log(profile1)
      const result = await Profile.findOne({ user: req.params.id })
      .populate("user", ["username", "avatar"])
      .populate("followers", ["username", "avatar"])
      .populate("following", ["username", "avatar"])

      res.status(200).json(result)
      
    } catch (error) {
      if (error.kind === "ObjectId") {
        return res.status(400).json({ message: "User not found" });
      }
      res.status(500).json(error);
    }
  }
);

/* @Route --  /api/profiles/all
   @Access -- private
   @desc -- GET get all profiles      
*/
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const profiles = await Profile.find().populate("user", [
        "username",
        "avatar",
      ]);
      const result = profiles.filter(
        (profile) => profile.user._id != req.user.id
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;
