// controllers/group.controller.js
import Group from "../models/Group.js";
import User from "../models/User.js";

export async function createGroup(req, res) {
  try {
    const { name, description, members, image, language } = req.body;
    const admin = req.user.id;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ message: "Group name is required" });
    }

    // Create new group
    const newGroup = await Group.create({
      name,
      description,
      admin,
      members: [...members, admin], // Include admin as a member

      language,
    });

    // Add group to all members' groups
    await User.updateMany(
      { _id: { $in: newGroup.members } },
      { $addToSet: { groups: newGroup._id } }
    );

    res.status(201).json(newGroup);
  } catch (error) {
    console.error("Error in createGroup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyGroups(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("groups")
      .populate({
        path: "groups",
        select: "name description admin members image language",
        populate: [
          { path: "admin", select: "fullName profilePic" },
          { path: "members", select: "fullName profilePic" },
        ],
      });

    res.status(200).json(user.groups);
  } catch (error) {
    console.error("Error in getMyGroups controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getGroupDetails(req, res) {
  try {
    const { id } = req.params;

    const group = await Group.findById(id)
      .populate("admin", "fullName profilePic")
      .populate("members", "fullName profilePic");

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if user is a member of the group
    if (!group.members.some(member => member._id.equals(req.user.id))) {
      return res.status(403).json({ message: "You are not a member of this group" });
    }

    res.status(200).json(group);
  } catch (error) {
    console.error("Error in getGroupDetails controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateGroup(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user.id;

    const group = await Group.findById(id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Only admin can update group
    if (!group.admin.equals(userId)) {
      return res.status(403).json({ message: "Only group admin can update the group" });
    }

    const updatedGroup = await Group.findByIdAndUpdate(id, updates, { new: true })
      .populate("admin", "fullName profilePic")
      .populate("members", "fullName profilePic");

    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error("Error in updateGroup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addGroupMembers(req, res) {
  try {
    const { id } = req.params;
    const { members } = req.body;
    const userId = req.user.id;

    // Validate members is an array
    if (!Array.isArray(members)) {
      return res.status(400).json({ message: "Members must be an array of user IDs" });
    }

    // Validate each member ID is a string
    if (members.some(member => typeof member !== 'string')) {
      return res.status(400).json({ message: "Each member ID must be a string" });
    }

    const group = await Group.findById(id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Only admin can add members
    if (!group.admin.equals(userId)) {
      return res.status(403).json({ message: "Only group admin can add members" });
    }

    // Add new members
    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      { $addToSet: { members: { $each: members } } },
      { new: true }
    )
      .populate("admin", "fullName profilePic")
      .populate("members", "fullName profilePic");

    // Add group to new members' groups
    await User.updateMany(
      { _id: { $in: members } },
      { $addToSet: { groups: id } }
    );

    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error("Error in addGroupMembers controller", error.message);
    res.status(500).json({ 
      message: "Internal Server Error",
      error: error.message // Include error details for debugging
    });
  }
}

export async function removeGroupMember(req, res) {
  try {
    const { id, memberId } = req.params;
    const userId = req.user.id;

    const group = await Group.findById(id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Only admin can remove members (or member can leave)
    if (!group.admin.equals(userId) && !memberId.equals(userId)) {
      return res.status(403).json({ message: "You don't have permission to remove this member" });
    }

    // Can't remove admin
    if (group.admin.equals(memberId)) {
      return res.status(400).json({ message: "Cannot remove group admin" });
    }

    // Remove member
    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      { $pull: { members: memberId } },
      { new: true }
    )
      .populate("admin", "fullName profilePic")
      .populate("members", "fullName profilePic");

    // Remove group from member's groups
    await User.findByIdAndUpdate(memberId, { $pull: { groups: id } });

    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error("Error in removeGroupMember controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
