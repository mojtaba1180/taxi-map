import qs from 'qs';
import { randomColor } from 'randomcolor';
import { RoutingApi } from '../../apis/routing-api';
import { addCoordinates, setIsDirection, setLocations, setLocationsRoutedType, setMarkerLocked, setMarkers, setSearchBarCollapsed, setShowDirection, setShowSearchBar } from '../../store/mapSlice';
import { Primary } from '../../utils/variables';
const MapQuery = ({ search, dispatch }) => {

    const query = qs.parse(search.split("?")[1]);
    const parse = (q) => JSON.parse(q)
    if (query.showDirection) dispatch(setShowDirection(parse(query.showDirection)));
    if (query.showSearchBar) dispatch(setShowSearchBar(parse(query.showSearchBar)));
    if (query.loc) handleLoc(query.loc, dispatch);
    //query.center center mode query handler in file components/main-map/main-map.jsx 
    //query.z center mode query handler in file components/main-map/main-map.jsx 

    if (query.type) handleType(query.type, dispatch);
    if (query.markers) handleMarkers(query.markers, dispatch);
    if (query.marker_locked) handleMarkerLocked(parse(query.marker_locked), dispatch);
    if (query.collapsed) handleCollapsed(parse(query.collapsed), dispatch);

}

// handle set direction locations and set route direction line
const handleLoc = async (loc, dispatch) => {
    const ArrayLocations = loc.split(";").map(item => item.split(",").map(i => Number(i)))
    let resultLocation = Promise.all(
        ArrayLocations.map(async (location,idx) => {
            const { res, err } = await RoutingApi.getLocation({
                lat: location[0],
                lon: location[1],
                zoom: 18
            })
            return {
                color:(idx === ArrayLocations.length - 1) ? "#00ff33" : Primary ,
                value: res.display_name,
                location: res
            }}))

    await resultLocation.then(res => {
        dispatch(setIsDirection(true))
        dispatch(setLocations(res));
    })

    const { res, err } = await RoutingApi.getRoutingDirection({
        lat_lon: loc
    });
    if (err) console.log(err);
    if (res) {
        res.routes.map(item => {
            dispatch(addCoordinates(item.geometry.coordinates))
        })
    }
}

// handle set direction type
const handleType = (type, dispatch) => {
    if(type === "car"|| type === "bike" || type === "foot"){
        dispatch(setLocationsRoutedType(type))
    }
}

const handleMarkers = async (markers , dispatch) => {
   const ArrayMarkers = markers.split(";").map(item => item.split(",").map(i => Number(i)))
    let resultMarkers = Promise.all(
        ArrayMarkers.map(async (marker) => {
            const { res, err } = await RoutingApi.getLocation({
                lat: marker[0],
                lon: marker[1],
                zoom: 18
            })
            return {
                color: randomColor(),
                value: res?.display_name,
                location: res
            }
        })
    )

    await resultMarkers.then(res => {
        dispatch(setMarkers(res));
    })
}

const handleMarkerLocked = (marker_locked, dispatch) =>{
    if(marker_locked === true || marker_locked === false){ dispatch(setMarkerLocked(marker_locked));}
}

const handleCollapsed = (collapsed , dispatch) => {
    if(collapsed === true || collapsed === false) dispatch(setSearchBarCollapsed(collapsed));
}

export default MapQuery