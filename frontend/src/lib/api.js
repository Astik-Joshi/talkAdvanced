import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users");
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}
// src/api/groups.js

export const createGroup = async (groupData) => {
  const response = await axiosInstance.post("/groups", groupData);
  return response.data;
};

export const getMyGroups = async () => {
  const response = await axiosInstance.get("/groups");
  return response.data;
};

export const getGroupDetails = async (groupId) => {
  const response = await axiosInstance.get(`/groups/${groupId}`);
  return response.data;
};

export const updateGroup = async (groupId, updates) => {
  const response = await axiosInstance.put(`/groups/${groupId}`, updates);
  return response.data;
};

export const addGroupMembers = async (groupId, { members }) => {
  const response = await axiosInstance.post(`/groups/${groupId}/members`, { 
    members 
  });
  return response.data;
};

export const removeGroupMember = async (groupId, memberId) => {
  const response = await axiosInstance.delete(`/groups/${groupId}/members/${memberId}`);
  return response.data;
};