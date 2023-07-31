import {
  ABOUTUS_PAGE_ROUTE,
  ADMIN_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  REGISTRATION_ROUTE,
  USER_PAGE_ROUTE,
} from "./utils/consts";

import AboutUsPage from "./pages/AboutUsPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import UserPage from "./pages/UserPage";

export const authRoutes = [
  {
    path: ADMIN_PAGE_ROUTE,
    Component: AdminPage,
  },

  {
    path: USER_PAGE_ROUTE,
    Component: UserPage,
  },
];

export const publicRoutes = [


  {
    path: LOGIN_PAGE_ROUTE,
    Component: LoginPage,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: RegistrationPage,
  },

  {
    path: ABOUTUS_PAGE_ROUTE,
    Component: AboutUsPage,
  },



];
