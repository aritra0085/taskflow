import Task from "../models/taskModel";

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;
    const task = new Task({
        title,
        description,
        priority,
        dueDate,
        completed: completed === 'yes' || completed === true,
      owner: req.user.id
    });
    const saved = await task.save();
    res.status(201).json({success: true, task: saved });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

//GET ALL TASK FOR LOGGED IN USER
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, tasks });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}    