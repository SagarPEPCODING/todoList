const { Tasks } = require("../models/task");
const express = require("express");
const router = express.Router();
const moongoose = require("mongoose");

router.get(`/`, async (req, res) => {
  const tasksList = await Tasks.find();

  if (!tasksList) {
    res.status(500).json({ success: false });
  }
  res.send(tasksList);
});

router.delete("/:id", (req, res) => {
  Tasks.findByIdAndRemove(req.params.id)
    .then((task) => {
      if (task) {
        return res
          .status(200)
          .json({ success: true, message: "the task is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "task not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

router.put("/:id", async (req, res) => {
  const taskExist = await Tasks.findById(req.params.id);

  const task = await Tasks.findByIdAndUpdate(
    req.params.id,
    {
      task: req.body.task,
    },
    { new: true }
  );
  if (!task) {
    return res.status(500).json({
      message: "the category with the given ID was not found",
    });
  } else {
    return res.status(200).send(task);
  }
});

router.post("/", async (req, res) => {
  let count = await Tasks.countDocuments();
  console.log(count);
  let task = new Tasks({
    id: count + 1,
    task: req.body.task,
  });
  console.log(task);
  user = await task.save();
  if (!task) {
    return res.status(400).send("the user cannot be created!");
  } else {
    res.send(task);
  }
});

module.exports = router;
