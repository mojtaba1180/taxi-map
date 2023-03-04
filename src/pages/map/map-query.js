import qs from 'qs';
import { RoutingApi } from '../../apis/routing-api';
import { NumToBol } from '../../helpers/handleNumToBol';
import { addCoordinates, setIsDirection, setLastDirection, setLastLocation, setLocations, setLocationsRoutedType, setMarkerLocked, setMarkers, setSearchBarCollapsed, setShowDirection, setShowSearchBar } from '../../store/mapSlice';
import { Primary } from '../../utils/variables';
const MapQuery = ({ search, dispatch, center }) => {
    const query = qs.parse(search.split("?")[1]);
    const parse = (q) => JSON.parse(q)
    if (query.showDirection) dispatch(setShowDirection(parse(query.showDirection)));
    if (query.showSearchBar) dispatch(setShowSearchBar(parse(query.showSearchBar)));
    if (query.loc) handleLoc(query.loc, dispatch, center);

    //query.center center mode query handler in file components/main-map/main-map.jsx 
    //query.z center mode query handler in file components/main-map/main-map.jsx 

    if (query.type) handleType(query.type, dispatch);
    if (query.marker) handleMarker(query, dispatch);
    if (query.marker_locked) handleMarkerLocked(parse(query.marker_locked), dispatch);
    if (query.collapsed) handleCollapsed(parse(query.collapsed), dispatch);
}
// handle set direction locations and set route direction line
const handleLoc = async (loc, dispatch, center) => {
    const ArrayLocations = loc.split(";").map(item => item.split(",").map(i => i));
    let resultLocation = Promise.all(
        ArrayLocations.map(async (location, idx) => {
            const { res, err } = await RoutingApi.getLocation({
                lat: location[0],
                lon: location[1],
                zoom: 18
            })

         
            if (res) {
                dispatch(setLastLocation(res)); //set changes in global state after request 
                let lat_lon = "";
                await loc.split(";").map(item => lat_lon = `${lat_lon}${item.split(",")[0]},${item.split(",")[1]};`);
                const Direction = await RoutingApi.getRoutingDirection({
                    lat_lon: lat_lon.slice(";", -1)
                });
                if (Direction.err) console.log(err);
                if (Direction.res) {
                    Direction.res.routes.map(item => {
                        dispatch(addCoordinates(item.geometry.coordinates));
                        dispatch(setLastDirection(Direction.res)); //set changes in global state after request 
                    })
                }
                return {
                    color: (idx === ArrayLocations.length - 1) ? "#00ff33" : Primary,
                    value: location[3] ? location[3] : res.display_name,
                    drag: location[2] ? NumToBol(location[2]) : null,
                    location: res
                }
            }
        }))

    await resultLocation.then(res => {
        dispatch(setIsDirection(true))
        dispatch(setLocations(res));
    })
}

// handle set direction type
const handleType = (type, dispatch) => {
    if (type === "car" || type === "bike" || type === "foot") {
        dispatch(setLocationsRoutedType(type))
    }
}

const handleMarker = async (query, dispatch) => {
    console.log(query.marker)
    const marker = query.marker.split(",").map(i => Number(i))
    const { res, err } = await RoutingApi.getLocation({
        lat: marker[0],
        lon: marker[1],
        zoom: 18
    })
    if (res) {
        await dispatch(setMarkers([
            {
                value: query.marker_name ? query.marker_name : res?.display_name,

                location: res,
            }
        ]));
        dispatch(setLastLocation(res))
    } else {
        dispatch(setMarkers({}))
    }
}

const handleMarkerLocked = (m, dispatch) => {
    dispatch(setMarkerLocked(NumToBol(m)));
}

const handleCollapsed = (collapsed, dispatch) => {
    dispatch(setSearchBarCollapsed(NumToBol(collapsed)));
    dispatch(setIsDirection(false));
}

export default MapQuery