// routes/group.route.js
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createGroup,
  getMyGroups,
  getGroupDetails,
  updateGroup,
  addGroupMembers,
  removeGroupMember,
} from "../controllers/group.controller.js";

const router = express.Router();

router.use(protectRoute);

router.post("/", createGroup);
router.get("/", getMyGroups);
router.get("/:id", getGroupDetails);
router.put("/:id", updateGroup);
router.post("/:id/members", addGroupMembers);
router.delete("/:id/members/:memberId", removeGroupMember);

export default router;