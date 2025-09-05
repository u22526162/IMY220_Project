import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import SplashLayout from "./layouts/SplashLayout";
import Layout from "./layouts/Layout";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/Home";
import ProjectPage from "./pages/Project";

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
