import Home from "../pages/home";
import MapLive from '../pages/map-live/index';
import MapOrder from "../pages/map-order";
import Map from './../pages/map/index';

const baseUrl = import.meta.env.VITE_BASE_URL;
const routes = [
    {
        index: true,
        element: <Home />,
        state: "home"
    },
    {

        path: `${baseUrl}/map`,
        element: <Map />,

    },
    {
        path: `${baseUrl}/map/order`,
        element: <MapOrder />,

    },
    {
        path: `${baseUrl}/map/live`,
        element: <MapLive />,

    },
];

export default routes