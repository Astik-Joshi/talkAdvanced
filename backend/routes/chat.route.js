import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createGroupChannel, getGroupChannel, getStreamToken } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/token", protectRoute, getStreamToken);

router.post("/groups/:groupId/channel", protectRoute, createGroupChannel);
router.get("/groups/:groupId/channel", protectRoute, getGroupChannel);
export default router;