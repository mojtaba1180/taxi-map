
import http from './configs/axiosConfig';
import OsrmApi from './configs/osrmConfig';
interface routingEndpointProp {
    routeType: "car" | "bike" | "foot",
    lat_lon: String,
    step: Boolean
}

const routingEndpoint = {
    directionRoute: ({ routeType, lat_lon, step }: routingEndpointProp) => `/routed-${routeType}/route/v1/driving/${lat_lon}?steps=${step}&geometries=geojson`
};

export const RoutingApi = {
    getLocation: async () => {
        try {
            const res = await http.get("");
            return { res }
        } catch (err) {
            return { err }
        }
    },
    getRoutingDirection: async ({ routeType, lat_lon, step }: routingEndpointProp) => {
        /*
        * @param : lat_lon: String 
        * @example  {lat_lon:"51.33801773402661,31.33801773402661;51.33801773402661,31.33801773402661"}
        */
        try {
            const res = await OsrmApi.get(routingEndpoint.directionRoute({ routeType, lat_lon, step }));
            return { res }
        } catch (err) {
            return { err }
        }
    }
}