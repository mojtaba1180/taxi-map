
import maplibreGl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import React, { useEffect, useState } from 'react';
import { Map, useMap } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { RoutingApi } from '../../apis/routing-api';
import { mapCenter, selectAction, selectCenter, setActions, setDrag, setLocations, setMarkers } from '../../store/mapSlice';
import { selectLocations } from './../../store/mapSlice';
import './main-map.css';

const MainMap = ({ children }) => {
    //redux state
    const center = useSelector(selectCenter);
    const { locations, inputIndexSelected } = useSelector(selectLocations);
    const mapStyle = import.meta.env.VITE_MAP_STYLE;
    const action = useSelector(selectAction);
    const dispatch = useDispatch();
    //react state
    const { search } = useLocation();
    const [searchParam, setSearchParam] = useSearchParams();
    const { usemap } = useMap();
    const [isDrag, setIsDrag] = useState(false);
    // ANCHOR handle center mode in search query string 
    const arrayMapCenter = searchParam.get("center") ? searchParam.get("center").split(",").map(i => Number(i)) : null


    useEffect(() => {
        dispatch(setDrag(isDrag))
    }, [isDrag]);

    // ANCHOR Csharp function pass data to Csharp app  
    const Cef = (action, d, z, c) => {
        if ((typeof CefSharp) === 'undefined') return;
        const zoom = z || usemap.getZoom();
        const center = c || usemap.getCenter();
        const data = d || {};
        CefSharp.PostMessage(JSON.stringify({
            action: action,
            data: data,
            zoom: zoom,
            lat: center.lat,
            lng: center.lng
        }));
    }

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

            const arr = res.display_name.split(",").reverse();
            let address = "";
            arr.forEach(function (str) {
                str = str.trim();
                if (str.match(/^ایران$/)) return;
                if (str.match(/^\d{5}-\d{5}$/)) return;
                if (str.match(/^استان .*$/)) return;
                if (str.match(/^شهرستان .*$/)) return;
                if (str.match(/^بخش .*$/)) return;
                if (address !== '') address = address + '، ';
                address = address + str;
            });
            Cef('point', {
                zoom,
                lat: res.lat,
                lng: res.lon,
                name: res.display_name,
                address: address,
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
            }
            if (!action.isMarkerLocked) {
                dispatch(setMarkers([
                    {
                        value: address,
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
                    longitude: arrayMapCenter ? arrayMapCenter[1] : center.lng,
                    latitude: arrayMapCenter ? arrayMapCenter[0] : center.lat,
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