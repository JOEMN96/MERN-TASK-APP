import Task from "../model/Task.mjs";

const createTask = async (req, res) => {
  const { description } = req.body;

  if (description == "" || description == undefined) {
    return res.status(400).json({ message: "Description is required" });
  }

  try {
    const _task = new Task({
      description,
    });
    await _task.save();
    res.status(201).json(_task);
  } catch (e) {
    res.status(500).json(e);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const _tasks = await Task.find({});
    if (!_tasks) {
      return res.status(404).send({ message: "No Tasks available in DB" });
    }
    res.status(200).send(_tasks);
  } catch (e) {
    res.status(500).send({ err: e });
  }
};

const getSingleTasks = async (req, res) => {
  const id = req.params.id;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).send({ message: "task not Found" });
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send({ err: e });
  }
};

export { createTask, getAllTasks, getSingleTasks };
