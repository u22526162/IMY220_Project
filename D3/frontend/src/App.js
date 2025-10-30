// Amadeus Fidos u22526162
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import SplashLayout from "./layouts/SplashLayout";
import Layout from "./layouts/Layout";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import HomePage from "./pages/Home";
import ProjectPage from "./pages/Project";
import SplashPage from "./pages/Splash";
import EditProfilePage from "./pages/EditProfile";
import ProjectsPage from "./pages/Projects";
import UserProfile from "./pages/Profile";
import FriendProfilePage from "./pages/FriendProfile";

export default function App() {
  return (
    <Router>
      <Routes>
        {/*Outer pages */}
        <Route
          path="/"
          element={
            <SplashLayout>
              <SplashPage />
            </SplashLayout>
          }
        />
        <Route
          path="/login"
          element={
            <SplashLayout>
              <LoginPage />
            </SplashLayout>
          }
        />
        <Route
          path="/register"
          element={
            <SplashLayout>
              <RegisterPage />
            </SplashLayout>
          }
        />

        {/*Inner pages */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <UserProfile />
            </Layout>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <Layout>
              <FriendProfilePage />
            </Layout>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <Layout>
              <EditProfilePage />
            </Layout>
          }
        />
        <Route
          path="/projects"
          element={
            <Layout>
              <ProjectsPage />
            </Layout>
          }
        />
        <Route
          path="/project/:id"
          element={
            <Layout>
              <ProjectPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}
