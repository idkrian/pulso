import { createBrowserRouter } from "react-router";
import Calendar from "../pages/calendar/Calendar";
import Dashboard from "../pages/Dashboard";
import TrainingSplits from "../pages/training-splits/TrainingSplits";
import TrainingSplitsDetails from "../pages/training-splits/TrainingSplitsDetails";
import Exercises from "../pages/exercises/Exercises";
import Workout from "@/pages/workout/Workout";
import TrainingSplitCreate from "@/pages/training-splits/TrainingSplitCreate";
import Login from "@/pages/login/Login";
import Profile from "@/pages/profile/Profile";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/exercises", element: <Exercises /> },
          { path: "/training-splits", element: <TrainingSplits /> },
          { path: "/training-splits/:id", element: <TrainingSplitsDetails /> },
          { path: "/training-splits/create", element: <TrainingSplitCreate /> },
          { path: "/calendar", element: <Calendar /> },
          { path: "/profile", element: <Profile /> },
          { path: "/workout/:splitId", element: <Workout /> },
        ],
      },
    ],
  },
]);

export default router;
