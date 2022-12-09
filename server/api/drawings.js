const router = require("express").Router();
const { v4: uuid } = require("uuid");
const {
  models: { Drawing },
} = require("../db");

// GET api/drawings
// get all drawings
router.get("/", async (req, res, next) => {
  try {
    const drawings = await Drawing.findAll();
    res.send(drawings);
  } catch (error) {
    next(error);
  }
});

// GET api/drawings/:drawingUUID
// gets a specified drawing based on uuid
router.get("/:drawingUUID", async (req, res, next) => {
  try {
    const drawing = await Drawing.findOne({
      where: { uuid: req.params.drawingUUID },
    });
    res.send(drawing);
  } catch (error) {
    next(error);
  }
});

// POST api/drawings
// creates a new drawing for a user that is not logged in
router.post("/", async (req, res, next) => {
  try {
    let newUUID = uuid();
    const drawing = await Drawing.create({
      uuid: newUUID,
      userId: req.body.userId,
      group: req.body.group,
    });
    res.status(201).send(drawing);
  } catch (error) {
    next(error);
  }
});

// PUT api/drawings/:drawingId
// update a drawing when a logged-in user saves a drawing
router.put("/:drawingId", async (req, res, next) => {
  try {
    const drawing = await Drawing.findByPk(req.params.drawingId);
    let updatedDrawing = await drawing.update(req.body);
    res.send(updatedDrawing);
  } catch (error) {
    next(error);
  }
});

// DELETE api/drawings/:drawingId
// delete a drawing from a user's profile
router.delete("/:drawingId", async (req, res, next) => {
  try {
    const drawing = await Drawing.findByPk(req.params.drawingId);
    drawing.destroy();
    res.send(drawing);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
