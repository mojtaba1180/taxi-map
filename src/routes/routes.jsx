import Home from "../pages/home";
import Map from './../pages/map/index';


const routes = [
    {
        index: true,
        element: <Home/>,
        state:"home"
    },
    {
        path:"/map",
        element:<Map/>,

    }
];

export default  routes