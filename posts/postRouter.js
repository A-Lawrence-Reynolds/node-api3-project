const express = require("express");

const router = express.Router();
const Post = require("../posts/postDb");

router.get("/", (req, res) => {
  // do your magic!
  Post.get()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "error getting posts"
      });
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
  Post.getById(req.params.id)
    .then(byId => {
      res.status(200).json(byId);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error getting by id"
      });
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
  Post.getById(req.params.id).then(async post => {
    await Post.remove(req.params.id);
    res.status(200).json(post);
  });
});

router.put("/:id", (req, res) => {
  // do your magic!
  Post.update(req.params.id, {
    text: req.body.text
  })
    .then(make => {
      res.status(200).json(make);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error posting"
      });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
