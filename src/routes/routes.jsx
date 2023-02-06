import Home from "../pages/home";
import MapOrder from "../pages/map-order";
import Map from './../pages/map/index';


const routes = [
    {
        index: true,
        element: <Home />,
        state: "home"
    },
    {
        path: "/map",
        element: <Map />,

    },
    {
        path: "/map/order",
        element: <MapOrder />,

    }
];

export default routes