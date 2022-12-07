const router = require("express").Router();

const { requireToken, isAdmin } = require("./gatekeeping");

const {
  models: { User },
} = require("../db");
module.exports = router;

//GET /users/
<<<<<<< HEAD
//NEED TO ADD isAdmin *****************************
=======
>>>>>>> c1804711393da791bc77fcc939e352fd0558a19e
router.get("/", requireToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET /users/:userId
router.get("/:userId", requireToken, async (req, res, next) => {
  try {
    if (req.user.id !== +req.params.userId) {
      return res.status(403).send("You do not have access.");
    }
    const user = await User.findByPk(req.params.userId, {
      include: [{ all: true, nested: true }],
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});
