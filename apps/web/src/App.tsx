import { RouterProvider } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import UpdateToast from "./components/pwa/UpdateToast";
import router from "./routes";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <UpdateToast />
    </AuthProvider>
  );
}

export default App;
