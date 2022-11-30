const router = require("express").Router();
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

// GET api/drawings/:drawingId
// gets a specified drawing based on id
router.get("/:drawingId", async (req, res, next) => {
  try {
    const drawing = await Drawing.findByPk(req.params.drawingId);
    res.send(drawing);
  } catch (error) {
    next(error);
  }
});

// POST api/drawings
// creates a new drawing for a user that is not logged in
router.post("/", async (req, res, next) => {
  try {
    const drawing = await Drawing.create();
    res.status(201).send(drawing);
  } catch (error) {
    next(error);
  }
});

// PUT api/drawings
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

module.exports = router;
