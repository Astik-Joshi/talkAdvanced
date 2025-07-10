import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";

const STREAM_API_KEY = import.meta.env.VITE_STEAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const { authUser } = useAuthUser();
  const navigate = useNavigate();

  // Fetch stream token only if authenticated
  const { data: tokenData, isLoading: tokenLoading } = useQuery({
    queryKey: ["streamToken", authUser?._id],
    queryFn: getStreamToken,
    enabled: !!authUser,
    staleTime: 60 * 60 * 1000, // 1 hour cache
  });

  // Initialize Stream client
  useEffect(() => {
    if (!authUser || tokenLoading) return;

    // If no token after loading, redirect
    if (!tokenData?.token) {
      toast.error("Failed to get call credentials");
      navigate("/");
      return;
    }

    const user = {
      id: authUser._id,
      name: authUser.fullName,
      image: authUser.profilePic,
    };

    const videoClient = new StreamVideoClient({
      apiKey: STREAM_API_KEY,
      user,
      token: tokenData.token,
    });

    setClient(videoClient);

    return () => {
      videoClient.disconnectUser().catch(console.error);
    };
  }, [authUser, tokenData, tokenLoading, navigate]);

  // Initialize and join call
  useEffect(() => {
    if (!client || !callId) return;

    const callInstance = client.call("default", callId);
    setCall(callInstance);

    callInstance.join({ create: true })
      .catch((err) => {
        console.error("Failed to join call", err);
        toast.error("Failed to join call");
        navigate("/");
      });

    return () => {
      callInstance.leave().catch(console.error);
    };
  }, [client, callId, navigate]);

  // Handle call state changes
  if (!client || !call) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Initializing call...</p>
          <p className="text-sm text-gray-500">This may take a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-900">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <CallUI />
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

const CallUI = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) {
    navigate("/");
    return null;
  }

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls onLeave={() => navigate("/")} />
    </StreamTheme>
  );
};

export default CallPage;