import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import Login from "@/pages/login/Login";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Exercises = lazy(() => import("@/pages/exercises/Exercises"));
const TrainingSplits = lazy(
  () => import("@/pages/training-splits/TrainingSplits"),
);
const TrainingSplitsDetails = lazy(
  () => import("@/pages/training-splits/TrainingSplitsDetails"),
);
const TrainingSplitCreate = lazy(
  () => import("@/pages/training-splits/TrainingSplitCreate"),
);
const Calendar = lazy(() => import("@/pages/calendar/Calendar"));
const Profile = lazy(() => import("@/pages/profile/Profile"));
const Workout = lazy(() => import("@/pages/workout/Workout"));

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
