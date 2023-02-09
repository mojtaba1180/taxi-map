import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
const baseUrl = import.meta.env.BASE_URL;
function App() {
  const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL ? import.meta.env.BASE_URL : "/" })
  //handle route query
  // useLayoutEffect(() => {
  //  MapQuery()
  // })

  return (<RouterProvider router={router} />)
}

export default App
