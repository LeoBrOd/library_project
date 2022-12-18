import express from "express";
import {
  login,
  register,
  logout,
  getUsers,
} from "../controllers/User.js";
import {
  addbook,
  getbooks,
  bookreview,
  checkinlibrarybooks,
  removebookfromlibrary,
} from "../controllers/Library.js";
import { VerifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/users", VerifyToken, getUsers);
router.get("/token", VerifyToken, (req, res) => {
  res.status(200).json({ msg: "OK" });
});
router.post("/addbook", addbook);
router.put("/bookreview", bookreview);
router.get("/getbooks", getbooks);
router.get(
  "/checkinlibrarybooks",
  checkinlibrarybooks
);
router.delete(
  "/removebookfromlibrary",
  removebookfromlibrary
);

export default router;
