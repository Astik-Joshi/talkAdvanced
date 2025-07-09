import { generateStreamToken } from "../lib/stream.js";

// controllers/chat.controller.js
// Add these new functions

// In your chat.controller.js
export async function createGroupChannel(req, res) {
  try {
    const { groupId } = req.params;
    const userId = req.user.id;

    const group = await Group.findById(groupId).populate('members');

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Verify user is group member
    if (!group.members.some(m => m._id.equals(userId))) {
      return res.status(403).json({ message: "Not a group member" });
    }

    const serverClient = StreamChat.getInstance(
      process.env.STREAM_API_KEY,
      process.env.STREAM_API_SECRET
    );

    const channel = serverClient.channel('messaging', `group_${groupId}`, {
      name: group.name,
      members: group.members.map(m => m._id.toString()),
      created_by_id: group.admin._id.toString(),
    });

    await channel.create();
    await channel.addMembers(group.members.map(m => m._id.toString()));

    res.status(201).json(channel);
  } catch (error) {
    console.error("Error creating group channel:", error);
    res.status(500).json({ message: "Error creating channel" });
  }
}

export async function getGroupChannel(req, res) {
  try {
    const { groupId } = req.params;
    const userId = req.user.id;

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if user is a member
    if (!group.members.some(member => member._id.equals(userId))) {
      return res.status(403).json({ message: "You are not a member of this group" });
    }

    // Get the channel from your chat service
    const channel = await chatService.getGroupChannel(groupId);

    res.status(200).json(channel);
  } catch (error) {
    console.error("Error in getGroupChannel controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getStreamToken(req, res) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = generateStreamToken(req.user.id, 3600); // 1 hour expiry
    res.status(200).json({ 
      token,
      expires_in: 3600,
      user_id: req.user.id 
    });
    
  } catch (error) {
    console.error("Chat token endpoint error:", error.message);
    res.status(500).json({ 
      message: "Failed to generate chat token",
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}