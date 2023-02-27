import qs from 'qs';
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
    if (query.marker) handleMarker(query, dispatch);
    if (query.marker_locked) handleMarkerLocked(parse(query.marker_locked), dispatch);
    if (query.collapsed) handleCollapsed(parse(query.collapsed), dispatch);
}

// handle set direction locations and set route direction line
const handleLoc = async (loc, dispatch) => {
    const ArrayLocations = loc.split(";").map(item => item.split(",").map(i => {
        if(Number(i)){
            return Number(i)
        }
    }));
   
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

    let lat_lon = "";
    await loc.split(";").map(item  => lat_lon = `${lat_lon}${item.split(",")[0]},${item.split(",")[1]};`);
    const { res, err } = await RoutingApi.getRoutingDirection({
        lat_lon: lat_lon.slice(";", -1)
    });
    
    if (err) console.log(err);
    if (res) {
        res.routes.map(item => {
            dispatch(addCoordinates(item.geometry.coordinates));
        })
    }
}

// handle set direction type
const handleType = (type, dispatch) => {
    if(type === "car"|| type === "bike" || type === "foot"){
        dispatch(setLocationsRoutedType(type))
    }
}

const handleMarker = async (query , dispatch) => {
    console.log(query.marker)
    const marker = query.marker.split(",").map(i => Number(i))
    const { res, err } = await RoutingApi.getLocation({
        lat: marker[0],
        lon: marker[1],
        zoom: 18
    }) 
    if(res){
        await dispatch(setMarkers([
            {
                    value: query.marker_name ? query.marker_name:  res?.display_name,
                    location: res,
            }
        ]));
    }else{
        dispatch(setMarkers({}))
    }
}

const handleMarkerLocked = (m, dispatch) =>{
    if(m === true || m === false || m === 0 || m === 1){
        if(m === 0){
             dispatch(setMarkerLocked(false));
        } else if(m === 1){
             dispatch(setMarkerLocked(true));
        } else {
            dispatch(setMarkerLocked(m))
        }
    }
}

const handleCollapsed = (collapsed , dispatch) => {
    if(collapsed === true || collapsed === false){
        dispatch(setSearchBarCollapsed(collapsed))
        dispatch(setIsDirection(false))
    };
}

export default MapQuery