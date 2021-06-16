import Task from "../model/Task.mjs";

const createTask = (req, res) => {
  const { description } = req.body;

  if (description == "" || description == undefined) {
    return res.status(400).json({ message: "Description is required" });
  }

  const _task = new Task({
    description,
  });

  _task
    .save()
    .then(() => {
      res.status(201).json(_task);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
};

const getAllTasks = (req, res) => {
  Task.find({})
    .then((tasks) => {
      if (!tasks) {
        return res.status(404).send({ message: "No Tasks available in DB" });
      }

      res.status(200).send(tasks);
    })
    .catch((e) => {
      res.status(500).send({ err: e });
    });
};

const getSingleTasks = (req, res) => {
  const id = req.params.id;

  Task.findById(id)
    .then((task) => {
      if (!task) {
        return res.status(404).send({ message: "task not Found" });
      }

      res.status(200).send(task);
    })
    .catch((e) => {
      res.status(500).send({ err: e });
    });
};

export { createTask, getAllTasks, getSingleTasks };
