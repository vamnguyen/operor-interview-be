import { Router } from "express";
import { getUsers } from "~/controllers/userController";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/api/users", getUsers);

export default router;
