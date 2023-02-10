
import qs from 'qs';
import MainApi from './configs/mainApi';
import NomiApi from './configs/nomiApi';
import OsrmApi from './configs/osrmApi';
interface routingEndpointProp {
    routeType: "car" | "bike" | "foot",
    lat_lon: String,
    step: Boolean
}
interface nomiReverseProp {
    lat: Number,
    lon: Number,
    zoom?: Number
}
interface nomiSearchProp {
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

const routingEndpoint = {
    directionRoute: ({ routeType, lat_lon, step }: routingEndpointProp) => `/routed-${routeType ? routeType : "car"}/route/v1/driving/${lat_lon}?steps=${step ? step : false}&geometries=geojson`,
    nomiReverse: ({ lat, lon, zoom }: nomiReverseProp) => `/nominatim/reverse.php?lat=${lat}&lon=${lon}&zoom=${zoom}8&addressdetails=1&format=json`,
    nomiSearch: ({ q, limit, addressdetails, format }: nomiSearchProp) => `/nominatim/search.php?${qs.stringify({ q, limit, addressdetails, format })}`,
    getOrderLocations: ({ start, end, top, order_app_id }: getOrderLocationsProp) => `/location?${qs.stringify({ start, end, top, order_app_id })}`
};

export const RoutingApi = {
    getLocation: async ({ lat, lon, zoom }: nomiReverseProp) => {
        try {
            const res = await NomiApi.get(routingEndpoint.nomiReverse({ lat, lon, zoom }));
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
    SearchLocation: async ({ q, limit, format, addressdetails }: nomiSearchProp) => {
        try {
            const res = await NomiApi.get(routingEndpoint.nomiSearch({ q, limit, format, addressdetails }));
            return { res }
        } catch (err) {
            return { err }
        }
    },
    getOrderLocations: async ({ auth_key, start, end, top, order_app_id }: getOrderLocationsProp) => {
        try {
            const res = await MainApi.get(routingEndpoint.getOrderLocations({ start, end, top, order_app_id }), {
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