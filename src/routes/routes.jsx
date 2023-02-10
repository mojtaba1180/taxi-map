import Home from "../pages/home";
import MapLive from '../pages/map-live/index';
import MapOrder from "../pages/map-order";
import Map from './../pages/map/index';


const routes = [
    {
        index: true,
        path: "/",
        element: <Home />,
        state: "home"
    },
    {

        path: `/map`,
        element: <Map />,

    },
    {
        path: `/map/order`,
        element: <MapOrder />,

    },
    {
        path: `/map/live`,
        element: <MapLive />,

    },
];

export default routes