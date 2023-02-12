import { NotificationsProvider } from "@mantine/notifications";
import { Helmet } from "react-helmet";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
const baseUrl = import.meta.env.BASE_URL;
function App() {
  const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL ? import.meta.env.BASE_URL : "/" })
  //handle route query

  return (
    <NotificationsProvider>
      <Helmet>
        <title>{import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <RouterProvider router={router} />
    </NotificationsProvider>
  )
}

export default App
