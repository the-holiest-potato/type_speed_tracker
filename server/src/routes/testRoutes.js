import express from "express";
import { saveTestResult, getTestHistory, getLeaderboard } from "../controllers/testController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/leaderboard/:mode", getLeaderboard);

// Protected routes require authentication
router.use(authMiddleware);

router.post("/", saveTestResult);
router.get("/history", getTestHistory);

export default router;
