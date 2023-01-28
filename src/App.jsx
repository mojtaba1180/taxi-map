import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";

function App() {
  const router = createBrowserRouter(routes) 
  //handle route query
  // useLayoutEffect(() => {
  //  MapQuery()
  // })

  return (<RouterProvider router={router} />)
}

export default App
