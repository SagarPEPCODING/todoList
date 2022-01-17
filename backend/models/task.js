const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});


tasksSchema.set("toJSON", {
  virtuals: true,
});

exports.Tasks = mongoose.model("Tasks", tasksSchema);
