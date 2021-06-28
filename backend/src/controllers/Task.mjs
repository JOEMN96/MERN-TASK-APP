import Task from "../model/Task.mjs";

const createTask = async (req, res) => {
  const { description } = req.body;

  if (description == "" || description == undefined) {
    return res.status(400).json({ message: "Description is required" });
  }

  try {
    const _task = new Task({
      ...req.body,
      owner: req.user._id,
    });
    await _task.save();
    res.status(201).json(_task);
  } catch (e) {
    res.status(500).json(e);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const task = await Task.findById("60da00910091b91d24431b41");
    await task.populate("owner").execPopulate();
    console.log(task);
    res.status(200).send(task);
  } catch (e) {
    res.send(404);
  }
  // try {
  //   const _tasks = await Task.find({});
  //   if (!_tasks) {
  //     return res.status(404).send({ message: "No Tasks available in DB" });
  //   }
  //   res.status(200).send(_tasks);
  // } catch (e) {
  //   res.status(500).send({ err: e });
  // }
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

const updateTask = async (req, res) => {
  // ? Check to Perform What Task Thnings from Task is updated
  const allowedUpdates = ["completed", "description", "version"];

  const currentUpdates = Object.keys(req.body);

  const isAllowed = currentUpdates.every((item) =>
    allowedUpdates.includes(item)
  );

  if (!isAllowed)
    return res.status(405).send({ msg: "Unable to update unknown Parameter" });

  const id = req.params.id;
  try {
    const _task = await Task.findById(id);

    currentUpdates.forEach((update) => {
      _task[update] = req.body[update];
    });

    await _task.save();

    if (!_task) return res.status(404).send({ msg: "Task not Found" });
    res.send(_task);
  } catch (e) {
    res.status(404).send(e);
  }
};

const deleteTask = async (req, res) => {
  try {
    const _task = await Task.findByIdAndDelete(req.params.id);
    if (!_task) return res.status(404).send({ msg: "Task not FOund" });
    res.send(_task);
  } catch (error) {
    res.status(500).send(error);
  }
};

export { createTask, getAllTasks, getSingleTasks, updateTask, deleteTask };
