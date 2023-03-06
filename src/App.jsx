import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
const baseUrl = import.meta.env.BASE_URL;
function App() {
  const router = createBrowserRouter(routes, { basename: baseUrl ? baseUrl : "/" })
  //handle route query
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient} >
      <NotificationsProvider>
        <Helmet>
          <title>{import.meta.env.VITE_APP_NAME}</title>
        </Helmet>

        <RouterProvider router={router} />
      </NotificationsProvider>
    </QueryClientProvider>
  )
}

export default App
