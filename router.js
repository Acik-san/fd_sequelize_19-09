const { Router } = require("express");
const UserController = require("./controllers/user.controller");
const TaskController = require("./controllers/task.controller");
const { checkUser } = require("./midllewares/user.middlewares");
const { checkTask } = require("./midllewares/task.middlewares");
const router = Router();

router.post("/users", UserController.createUser);
router.get("/users", UserController.getAllUsers);
router.patch("/users/:userId", UserController.updateUser);
router.get("/users/:userId", UserController.getUserByPk);
router.patch("/users/:userId/v2", checkUser, UserController.updateUserInstance);
router.delete("/users/:userId", checkUser, UserController.deleteUserInstance);

router.post("/users/:userId/tasks", checkUser, TaskController.createTask);
router.get("/users/:userId/tasks", checkUser, TaskController.getTasksByUserId);
router.patch(
  "/users/:userId/tasks/:taskId",
  checkUser,
  checkTask,
  TaskController.updateTaskByUserId
);
router.delete(
  "/users/:userId/tasks/:taskId",
  checkUser,
  checkTask,
  TaskController.deleteTaskByUserId
);

module.exports = router;
