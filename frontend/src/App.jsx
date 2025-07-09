import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import { Toaster } from "react-hot-toast";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";
import GroupList from "./components/GroupList.jsx";
import GroupDetails from "./components/GroupDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();

  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Layout showSidebar={true}>
              <HomePage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Layout showSidebar={true}>
              <NotificationsPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/call/:id" element={
          <ProtectedRoute>
            <CallPage />
          </ProtectedRoute>
        } />
        
        <Route path="/chat/:id" element={
          <ProtectedRoute>
            <Layout showSidebar={false}>
              <ChatPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/onboarding" element={
          authUser ? (
            !isOnboarded ? <OnboardingPage /> : <Navigate to="/" />
          ) : (
            <Navigate to="/login" />
          )
        } />
        
        <Route path="/group-chat/:groupId" element={
          <ProtectedRoute>
            <Layout showSidebar={false}>
              <ChatPage isGroupChat={true} />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/groups" element={
          <ProtectedRoute>
            <Layout showSidebar={true}>
              <GroupList />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/groups/:id" element={
          <ProtectedRoute>
            <Layout showSidebar={true}>
              <GroupDetails />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;