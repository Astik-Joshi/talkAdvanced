import { StreamChat } from "stream-chat";
import 'dotenv/config';

// Initialize client once (fixes "serverClient not defined")
const streamClient = StreamChat.getInstance(
  process.env.STEAM_API_KEY, 
  process.env.STEAM_API_SECRET
);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser({
      id: userData.id.toString(),
      name: userData.name,
      image: userData.image || "",
      role: 'user'
    });
  } catch (error) {
    console.error("Stream user upsert failed:", error.message);
    throw error;
  }
};

export function generateStreamToken(userId, expiresInSeconds = 86400) {
  try {
    if (!userId) throw new Error("User ID is required");
    const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
    return streamClient.createToken(userId.toString(), exp); // Pass exp as a number
  } catch (error) {
    console.error("Stream token generation failed:", error.message);
    throw new Error(`Token generation failed: ${error.message}`);
  }
}
