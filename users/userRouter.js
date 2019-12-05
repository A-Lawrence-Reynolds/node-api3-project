const express = require("express");

const router = express.Router();

const Users = require("../users/userDb");
const Posts = require("../posts/postDb");

router.post("/", validateUser, (req, res) => {
  // do your magic!
  Users.insert({ name: req.body.name })
    .then(make => {
      res.status(200).json(make);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error posting"
      });
    });
});

router.post("/:id/posts", validatePost, validateUserId, (req, res) => {
  // do your magic!
  Posts.insert({
    user_id: req.params.id,
    text: req.body.text
  })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "error adding users post" });
    });
});

router.get("/", (req, res) => {
  // do your magic!
  Users.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "error getting users" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
    .then(byPost => {
      res.status(200).json(byPost);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error getting posts"
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then(async byeUser => {
      await Users.remove(req.params.id);
      res.status(200).json(byeUser);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error removing user"
      });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
  Users.update(req.params.id, {
    name: req.body.name
  })
    .then(update => {
      res.status(200).json(update);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error editing user"
      });
    });
});

//custom middleware

async function validateUserId(req, res, next) {
  // do your magic!

  try {
    const user = await Users.getById(req.params.id);
    req.user = user;

    next();
  } catch (err) {
    res.status(400).json({
      message: "invalid user id"
    });
  }
}

async function validateUser(req, res, next) {
  // do your magic!
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: "missing user data"
    });
  } else if (req.body.name && req.body.name.length) {
    next();
  } else {
    res.status(400).json({
      message: "missing required name field"
    });
  }
}

async function validatePost(req, res, next) {
  // do your magic!
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: "missing post data"
    });
  } else if (req.body.text && req.body.text.length) {
    next();
  } else {
    res.status(400).json({
      message: "missing required text field"
    });
  }
}

module.exports = router;
