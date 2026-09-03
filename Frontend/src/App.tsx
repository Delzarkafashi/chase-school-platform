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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/utbildningar" element={<CoursesPage />} />
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
        path="/dashboard"
        element={<DashboardPage />}
      />

      <Route
        path="/dashboard/content"
        element={<ContentManagementPage />}
      />
      <Route
        path="/dashboard/content/about"
        element={<AboutContentAdminPage />}
      />

      <Route
        path="/dashboard/content/business"
        element={<BusinessContentAdminPage />}
      />
      
      <Route
        path="/dashboard/content/contact"
        element={<ContactContentAdminPage />}
      />
      <Route path="/om-chase" element={<AboutPage />} />
      <Route path="/foretag" element={<BusinessPage />} />
      <Route path="/kontakt" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;