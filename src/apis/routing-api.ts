
import qs from 'qs';
import MainHttp from './configs/mainConfig';
import MapHttp from './configs/mapConfig';
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
interface nominatimSearchProp {
    q: String,
    limit: String,
    addressdetails: Number,
    format?: "json",
}
interface getOrderLocationsProp {
    start: String,
    end: String,
    top: String,
    order_app_id?: String
    auth_key?: String,
}

const baseEndpoint = {
    nominatim: "nominatim"
}
const routingEndpoint = {
    directionRoute: ({ routeType, lat_lon, step }: routingEndpointProp) => `/routed-${routeType ? routeType : "car"}/route/v1/driving/${lat_lon}?steps=${step ? step : false}&geometries=geojson`,
    nominatimReverse: ({ lat, lon, zoom }: nominatimReverseProp) => `${baseEndpoint.nominatim}/reverse.php?lat=${lat}&lon=${lon}&zoom=${zoom}8&addressdetails=1&format=json`,
    nominatimSearch: ({ q, limit, addressdetails, format }: nominatimSearchProp) => `${baseEndpoint.nominatim}/search.php?${qs.stringify({ q, limit, addressdetails, format })}`,
    getOrderLocations: ({ start, end, top, order_app_id }: getOrderLocationsProp) => `/location?${qs.stringify({ start, end, top, order_app_id })}`
};

export const RoutingApi = {
    getLocation: async ({ lat, lon, zoom }: nominatimReverseProp) => {
        try {
            const res = await MapHttp.get(routingEndpoint.nominatimReverse({ lat, lon, zoom }));
            return { res }
        } catch (err) {
            return { err }
        }
    },
    getRoutingDirection: async ({ routeType, lat_lon, step }: routingEndpointProp) => {
        try {
            const res = await OsrmApi.get(routingEndpoint.directionRoute({ routeType, lat_lon, step }));
            return { res }
        } catch (err) {
            return { err }
        }
    },
    SearchLocation: async ({ q, limit, format, addressdetails }: nominatimSearchProp) => {
        try {
            const res = await MapHttp.get(routingEndpoint.nominatimSearch({ q, limit, format, addressdetails }));
            return { res }
        } catch (err) {
            return { err }
        }
    },
    getOrderLocations: async ({ auth_key, start, end, top, order_app_id }: getOrderLocationsProp) => {
        try {
            const res = await MainHttp.get(routingEndpoint.getOrderLocations({ start, end, top, order_app_id }), {
                headers: {
                    "Authorization": `Bearer ${auth_key}`
                }
            });
            return { res }
        } catch (err) {
            return { err }
        }
    },


}