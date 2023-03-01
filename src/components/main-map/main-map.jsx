
import maplibreGl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import React, { useEffect, useState } from 'react';
import { Map, useMap } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RoutingApi } from '../../apis/routing-api';
import AddressStringFilter from '../../helpers/addressStringFilter';
import { GetCenterOfDirection } from '../../helpers/get-center-of-direction';
import { mapCenter, selectAction, selectCenter, selectMapLastRequest, setActions, setDrag, setLastLocation, setLocations, setMarkers } from '../../store/mapSlice';
import { selectLocations } from './../../store/mapSlice';
import './main-map.css';
const MainMap = ({ children }) => {
    //redux state
    const center = useSelector(selectCenter);
    const { locations, inputIndexSelected } = useSelector(selectLocations);
    const { lastLocation, lastDirection } = useSelector(selectMapLastRequest);
    const mapStyle = import.meta.env.VITE_MAP_STYLE;
    const action = useSelector(selectAction);
    // const coordinates = useSelector(selectCoordinates);
    const dispatch = useDispatch();
    //react state

    const [searchParam, setSearchParam] = useSearchParams();
    const { usemap } = useMap();
    const [isDrag, setIsDrag] = useState(false);
    // ANCHOR handle center mode in search query string 

    const getCenterOfQString = () => {
        if (searchParam.get("center")) {
            return searchParam.get("center").split(",").map(i => Number(i))
        } else
            if (searchParam.get("loc")) {
                return GetCenterOfDirection({ points: searchParam.get("loc").split(";").map(item => [item.split(",")[0], item.split(",")[1]]) })
            } else {
                return null
            }
    }

    const qStringCenter = getCenterOfQString();

    // ANCHOR Csharp function pass data to Csharp app  
    const Cef = (action, d, z, c) => {
        if ((typeof CefSharp) === 'undefined') return;
        const zoom = z || usemap.getZoom() || center.zoom
        const _center = c || usemap.getCenter() || center
        const data = d || {};
        CefSharp.PostMessage(JSON.stringify({
            action: action,
            data: data,
            zoom: zoom,
            lat: _center.lat,
            lng: _center.lng
        }));
    }


    useEffect(() => { /// call Cef after update locations and direction
        if (lastLocation !== null && lastDirection !== null) {
            const address = AddressStringFilter(lastLocation.display_name);
            Cef('route', {
                lat: center.lat,
                lng: center.lng,
                zoom: center.zoom,
                name: lastLocation.display_name || "",
                address: address || "",
                waypoints: lastDirection.waypoints || {},
                summary: address || "",
            });
        }
    }, [lastLocation, lastDirection])


    useEffect(() => {
        dispatch(setDrag(isDrag))
    }, [isDrag]);



    const handleDragStart = () => {
        setIsDrag(true);
    }
    const handleDrag = ({ viewState }) => {
        Cef('point');
        dispatch(mapCenter({
            lat: viewState.latitude,
            lng: viewState.longitude,
            zoom: viewState.zoom
        }))
    }
    const handleDragEnd = () => {
        searchParam.set("z", center.zoom);
        searchParam.set("center", `${center.lat},${center.lng}`);
        setSearchParam(searchParam)
        setIsDrag(false);
    }

    const handleClickMap = async (event) => {
        const lng = event.lngLat.lng;
        const lat = event.lngLat.lat;
        const zoom = parseInt(center.zoom);
        const { res, err } = await RoutingApi.getLocation({
            lat: lat,
            lon: lng,
            zoom
        });
        if (err) return;
        if (res) {
            Cef('point', {
                zoom,
                lat: res.lat,
                lng: res.lon,
                name: res.display_name,
                address: AddressStringFilter(res.display_name),
                osm_type: res.osm_type
            });
            if (action.chooseOnMap) {
                usemap.flyTo({ center: [lng, lat] });
            }
            if (action.isDirection, action.chooseOnMap) {
                let arr = [...locations];
                const handleUpdateLocation = () => {
                    return arr.map((item, idx) => {
                        if (inputIndexSelected === idx) {
                            return {
                                value: res.display_name,
                                location: res
                            }
                        } else {
                            return item
                        }
                    })
                }
                dispatch(setLocations(handleUpdateLocation()));
                dispatch(setActions({ chooseOnMap: false }))
                dispatch(setLastLocation(res))
            }
            if (!action.isMarkerLocked) {
                dispatch(setMarkers([
                    {
                        value: AddressStringFilter(res.display_name),
                        location: res
                    }
                ]))
            }
        }
    }
    return (
        <div className="map-wrap">
            <Map
                mapLib={maplibreGl}
                initialViewState={{
                    longitude: qStringCenter ? qStringCenter[1] : center.lng,
                    latitude: qStringCenter ? qStringCenter[0] : center.lat,
                    zoom: searchParam.get("z") ? searchParam.get("z") : center.zoom // handle set zoom on url query string or default zoom
                }}
                onClick={(e) => handleClickMap(e)}
                id="usemap"
                onDblClick={(e) => console.log(e)}
                style={{ width: "100%", height: "100vh" }}
                mapStyle={mapStyle}
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                onZoom={handleDrag}
                onZoomStart={handleDragStart}
                onZoomEnd={handleDragEnd}
            >
                {children}
            </Map>

        </div>

    )
}

export default MainMap