import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserBooks,
  addUserBook,
  deleteUserBook,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);

router.route("/login").post(authUser);

router.route("/books").get(protect, getUserBooks).post(protect, addUserBook);

router.route("/books/:id").delete(protect, deleteUserBook);

export default router;
