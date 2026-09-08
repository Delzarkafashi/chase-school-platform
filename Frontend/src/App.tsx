import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import AboutPage from "./pages/AboutPage";
import BusinessPage from "./pages/BusinessPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import ApplicationPage from "./pages/ApplicationPage";
import ApplicationSuccessPage from "./pages/ApplicationSuccessPage";
import DashboardPage from "./pages/DashboardPage";
import ContentManagementPage from "./pages/ContentManagementPage";
import AboutContentAdminPage from "./pages/AboutContentAdminPage";
import BusinessContentAdminPage from "./pages/BusinessContentAdminPage";
import ContactContentAdminPage from "./pages/ContactContentAdminPage";
import CourseContentAdminPage from "./pages/CourseContentAdminPage";
import CourseDisplayAdminPage from "./pages/CourseDisplayAdminPage";
import UsersAdminPage from "./pages/UsersAdminPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Publika sidor */}
      <Route path="/" element={<HomePage />} />

      <Route
        path="/utbildningar"
        element={<CoursesPage />}
      />

      <Route
        path="/utbildningar/:id"
        element={<CourseDetailsPage />}
      />

      <Route
        path="/ansok/:courseId"
        element={<ApplicationPage />}
      />

      <Route
        path="/ansokan-skickad/:id"
        element={<ApplicationSuccessPage />}
      />

      <Route
        path="/om-chase"
        element={<AboutPage />}
      />

      <Route
        path="/foretag"
        element={<BusinessPage />}
      />

      <Route
        path="/kontakt"
        element={<ContactPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Användare */}
      <Route
        path="/dashboard/users"
        element={
          <ProtectedRoute permission="users.view">
            <UsersAdminPage />
          </ProtectedRoute>
        }
      />

      {/* Utbildningar */}
      <Route
        path="/dashboard/courses"
        element={
          <ProtectedRoute permission="courses.view">
            <CourseContentAdminPage />
          </ProtectedRoute>
        }
      />

      {/* Innehållshantering */}
      <Route
        path="/dashboard/content"
        element={
          <ProtectedRoute permission="siteContent.manage">
            <ContentManagementPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/content/about"
        element={
          <ProtectedRoute permission="siteContent.manage">
            <AboutContentAdminPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/content/business"
        element={
          <ProtectedRoute permission="siteContent.manage">
            <BusinessContentAdminPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/content/contact"
        element={
          <ProtectedRoute permission="siteContent.manage">
            <ContactContentAdminPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/content/courses"
        element={
          <ProtectedRoute permission="siteContent.manage">
            <CourseDisplayAdminPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;