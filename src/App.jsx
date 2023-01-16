import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Map from './pages/map/index';

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Home />
    },
    {
      path:"/map",
      element:<Map/>
    }
  ])
  return (<RouterProvider router={router} />)
}

export default App
