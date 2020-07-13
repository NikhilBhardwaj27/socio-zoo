const express = require("express");
const router = express.Router();
const multer = require("multer");
const passport = require("passport");
const User = require("../../modals/user");
const Post = require("../../modals/post");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config();

// configuring Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// setting up multer for image upload
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
      cb(new Error("File is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

/* @Route --  api/posts
   @Access -- private
   @desc -- POST           
*/
router.post(
  "/",
  [passport.authenticate("jwt", { session: false }), upload.single("image")],
  async (req, res) => {
    // Validation of Posts
    if (!req.body.text) {
      return res.status(400).json({ message: "Text area must not be empty" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Upload any picture" });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const upload = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "test-directory",
        eager: [{ width: 500, height: 500 }],
      });

      const post = new Post({
        user: req.user.id,
        name: user.username,
        avatar: user.avatar,
        text: req.body.text,
        public_id: upload.public_id,
        url: upload.eager[0].url,
      });

      const result = await post.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

/* @Route --  /api/posts/all-posts
   @Access -- private
   @Method -- GET
*/
router.get(
  "/all-posts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const result = await Post.find({}).sort({ date: -1 });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

/* @Route --  /api/posts/my-posts
   @Access -- private
   @Method -- GET current user posts
*/
router.get(
  "/my-posts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const result = await Post.find({ user: req.user.id });

      if (!result) {
        return res.status(404).json({ message: "Posts not found" });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

/* @Route --  /api/posts/:id
   @Access -- private
   @Method -- GET post by id
*/
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const result = await Post.find({ user: req.params.id });

      if (!result) {
        return res.status(404).json({ message: "Posts not found" });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

/* @Route --  /api/posts/delete/:id
   @Access -- private
   @Method -- DELETE post by id
*/
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const result = await Post.findOne({ _id: req.params.id });

      if (result.user != req.user.id) {
        return res
          .status(401)
          .json({ message: "Not Authorized to delete the post" });
      }
      await cloudinary.v2.uploader.destroy(result.public_id);
      await result.remove();
      res.status(200).json({ message: "Post removed" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

/* @Route --  /api/posts/like/:id
   @Access -- private
   @Method -- PUT Like post by id
*/
router.put(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      // Check if post has already been liked
      if (
        post.like.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).json({ message: "Post already liked" });
      }
      post.like.unshift({ user: req.user.id });
      await post.save();
      res.status(200).json(post.like);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

/* @Route --  /api/posts/unlike/:id
   @Access -- private
   @Method -- PUT unlike post by id
*/
router.put(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      // Check if post has  been liked or not
      if (
        post.like.filter((like) => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res.status(400).json({ message: "Post has not been liked yet" });
      }
      // Remove index
      const removeIndex = post.like
        .map((like) => like.user.toString())
        .indexOf(req.user.id);
      post.like.splice(removeIndex, 1);
      await post.save();
      res.status(200).json(post.like);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

/* @Route --  /api/posts/comment/:id
   @Access -- private
   @Method -- POST add comment by id
*/
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // Check validation for comments
    if (!req.body.text) {
      return res.status(400).json({ message: "Comment should not be empty" });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        user: req.user.id,
        name: user.username,
        avatar: user.avatar,
        text: req.body.text,
      };
      post.comments.unshift(newComment);

      await post.save();
      res.status(200).json(post.comments);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

/* @Route --  /api/posts/delete-comment/:id/:comment-id
   @Access -- private
   @Method - DELETE delete comment by id
*/
router.delete(
  "/delete-comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const result = post.comments.filter(
        (comment) => comment.id != req.params.comment_id
      );

      if (!comment) {
        return res.status(400).json({ message: "Comment not found" });
      }
      post.comments = result;
      await post.save();

      res.status(200).json({ message: "comment deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;
