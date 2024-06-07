import { Router } from "express";
import { getUsers } from "src/controllers/userController";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/api/users", getUsers);

export default router;
