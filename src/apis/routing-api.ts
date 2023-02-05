
import http from './configs/mapConfig';
import OsrmApi from './configs/osrmConfig';
interface routingEndpointProp {
    routeType: "car" | "bike" | "foot",
    lat_lon: String,
    step: Boolean
}
interface nominatimReverseProp {
    lat: Number,
    lon: Number,
    zoom?: Number
}

const baseEnpoint = {
    nominatim: "nominatim"
}


const routingEndpoint = {
    directionRoute: ({ routeType, lat_lon, step }: routingEndpointProp) => `/routed-${routeType ? routeType : "car"}/route/v1/driving/${lat_lon}?steps=${step ? step : false}&geometries=geojson`,
    nominatimReverse: ({ lat, lon, zoom }: nominatimReverseProp) => `${baseEnpoint.nominatim}/reverse.php?lat=${lat}&lon=${lon}&zoom=${zoom}8&addressdetails=1&format=json`
};

export const RoutingApi = {
    getLocation: async ({ lat, lon, zoom }: nominatimReverseProp) => {
        try {
            const res = await http.get(routingEndpoint.nominatimReverse({ lat, lon, zoom }));
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