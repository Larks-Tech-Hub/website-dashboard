import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import NewsPaperOutlined from "@mui/icons-material/NewspaperOutlined";
import SupervisorAccountOutlined from "@mui/icons-material/SupervisorAccountOutlined";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import ViewCarouselOutlined from "@mui/icons-material/ViewCarouselOutlined";
import Logout from "@mui/icons-material/Logout";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import SchoolOutlined from '@mui/icons-material/SchoolOutlined';
import {
  type LegacyAuthProvider as AuthProvider,
  Refine,
} from "@refinedev/core";
import {
  ErrorComponent,
  useNotificationProvider,
  ReadyPage,
  RefineSnackbarProvider,
} from "@refinedev/mui";

import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";
import { Header, Layout, Sider, Title } from "components/layout";
import { ColorModeContextProvider } from "contexts";
import type { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";

import {
  AgentProfile,
  Agents,
  AllStudents,
  CreateStudent,
  StudentDetails,
  EditStudent,
  AllAdmins,
  CreateAdmin,
  AdminDetails,
  EditAdmin,
  AllStaffs,
  CreateStaff,
  StaffDetails,
  EditStaff,
  AllPrefects,
  CreatePrefect,
  PrefectDetails,
  EditPrefect,
  AllEvents,
  CreateEvent,
  EventDetails,
  EditEvent,
  AllSliders,
  CreateSlider,
  SliderDetails,
  EditSlider,
  AllNews,
  Admissions,
  Prints,
  CreateNew,
  NewDetails,
  EditNew,
  Home,
  Login,
  MyProfile,
} from "pages";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

function App() {
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        const response = await fetch("https://shining-stars-dashboard.onrender.com/api/v1/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
          }),
        });

        const data = await response.json();

        if (response.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id,
            })
          );
        } else {
          return Promise.reject();
        }
      }
      localStorage.setItem("token", `${credential}`);

      return Promise.resolve();
    },
    logout: () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: async () => null,
    getUserIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider("https://shining-stars-dashboard.onrender.com/api/v1")}
          notificationProvider={useNotificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "admissions",
              list: Admissions,
              icon: <SchoolOutlined />,
            },
            {
              name: "admins",
              options: { label: "Administrators " },
              list: AllAdmins,
              show: AdminDetails,
              create: CreateAdmin,
              edit: EditAdmin,
              icon: <SupervisorAccountOutlined />,
            },
            {
              name: "staffs",
              list: AllStaffs,
              show: StaffDetails,
              create: CreateStaff,
              edit: EditStaff,
              icon: <PeopleAltOutlined />,
            },
            {
              name: "students",
              list: AllStudents,
              show: StudentDetails,
              create: CreateStudent,
              edit: EditStudent,
              icon: <PeopleAltOutlined />,
            },
            {
              name: "prefects",
              list: AllPrefects,
              show: PrefectDetails,
              create: CreatePrefect,
              edit: EditPrefect,
              icon: <PeopleAltOutlined />,
            },
            {
              name: "events",
              list: AllEvents,
              show: EventDetails,
              create: CreateEvent,
              edit: EditEvent,
              icon: <CalendarMonthOutlined />,
            },
            {
              name: "sliders",
              list: AllSliders,
              show: SliderDetails,
              create: CreateSlider,
              edit: EditSlider,
              icon: <ViewCarouselOutlined />,
            },
            {
              name: "news",
              list: AllNews,
              show: NewDetails,
              create: CreateNew,
              edit: EditNew,
              icon: <NewsPaperOutlined />,
            },
            {
              name: "agents",
              list: Agents,
              show: AgentProfile,
              icon: <PeopleAltOutlined />,
            },
            {
              name: "my-profile",
              options: { label: "My Profile " },
              list: MyProfile,
              icon: <AccountCircleOutlined />,
            },
            {
              name: "print",
              list: Prints,
              icon: <NewsPaperOutlined />,
            },
            {
              name: "login",
              options: { label: "Login " },
              list: Login,
              icon: <Logout />,
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          legacyRouterProvider={routerProvider}
          legacyAuthProvider={authProvider}
          LoginPage={Login}
          DashboardPage={Home}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
