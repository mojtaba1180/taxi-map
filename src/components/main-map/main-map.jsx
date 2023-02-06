
import maplibreGl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import qs from "qs";
import randomColor from 'randomcolor';
import React, { useEffect, useState } from 'react';
import { Map, Marker, useMap } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import env from '../../../env.json';
import { RoutingApi } from '../../apis/routing-api';
import { drivers } from '../../json/drivers.json';
import { mapCenter, selectAction, selectCenter, setActions, setDrag, setLocations, setMarkers } from '../../store/mapSlice';
import LocationMarker from '../location-marker/location-marker';
import LayerLineRoute from '../map-direction/layer-line-route';
import { selectLocations, selectMarkers } from './../../store/mapSlice';
import './main-map.css';



const MainMap = () => {
    //redux state
    const center = useSelector(selectCenter);
    const { locations, inputIndexSelected } = useSelector(selectLocations);
    const selectedMarkers = useSelector(selectMarkers);
    const mapStyle = env.VITE_MAP_STYLE;
    const action = useSelector(selectAction);
    const dispatch = useDispatch();
    //react state
    const [isDrag, setIsDrag] = useState(false);
    const { search } = useLocation();
    const { usemap } = useMap();

    // ANCHOR handle center mode in search query string 
    const query = qs.parse(search.split("?")[1]);
    const arrayMapCenter = query.center ? query.center.split(",").map(i => Number(i)) : null

    // set actions on map
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
        if (err) return;
        if (res) Cef('point', {
            zoom,
            lat: res.lat,
            lng: res.lon,
            name: res.display_name,
            address: address,
            osm_type: res.osm_type
        });
        usemap.flyTo({ center: [lng, lat] });
        if (action.isDirection, action.chooseOnMap) {
            let arr = [...locations];
            const handleUpdateLocation = () => {
                return arr.map((item, idx) => {
                    if (inputIndexSelected === idx) {
                        return {
                            color: randomColor(),
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
        dispatch(setMarkers([
            {
                value: address,
                location: res
            }
        ]))
    }
    const handleMarkerDrag = async (event, idx) => {
        const lng = event.lngLat.lng;
        const lat = event.lngLat.lat;
        const zoom = parseInt(center.zoom);
        const { res, err } = await RoutingApi.getLocation({
            lat: lat,
            lon: lng,
            zoom
        });
        if (err) return;
        let arr = [...locations];
        const handleUpdateLocation = () => {
            return arr.map((item, index) => {
                if (index === idx) {
                    return {
                        color: randomColor(),
                        value: res.display_name,
                        location: {
                            ...res,
                            lat,
                            lon: lng
                        }
                    }
                } else {
                    return item
                }
            })
        }
        dispatch(setLocations(handleUpdateLocation()));
    }

    const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': 10,
            'circle-color': '#007cbf'
        }
    }

    return (
        <div className="map-wrap">

            <Map
                mapLib={maplibreGl}
                initialViewState={{
                    longitude: arrayMapCenter ? arrayMapCenter[1] : center.lng,
                    latitude: arrayMapCenter ? arrayMapCenter[0] : center.lat,
                    zoom: center.zoom
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
                <LayerLineRoute />

                {/* center mode marker */}
                {
                    center.zoom >= 13 && drivers.map(item => {
                        return (
                            <Marker key={item.id} children={
                                <img src='/car.png' width={15} alt="car" />
                            }
                                draggable={!action.isMarkerLocked}
                                latitude={item.location.latitude}
                                longitude={item.location.longitude}
                                rotation={item.location.bearing} />


                        )
                    })
                }
                {/* direction markers */}
                {
                    locations?.map((item, idx) => {
                        if (item.location.hasOwnProperty("lat") && item.location.hasOwnProperty("lon")) {
                            return (
                                <Marker
                                    key={idx}
                                    draggable={!action.isMarkerLocked}
                                    onDragEnd={(e) => handleMarkerDrag(e, idx)}
                                    children={<LocationMarker title={item.location.display_name} color={item.color} />
                                    }
                                    anchor="bottom"
                                    // onDrag={(e) => console.log(e)}
                                    latitude={item.location?.lat} longitude={item.location?.lon} />
                            )
                        }
                    })
                }
                {/* choose on map markers */}
                {
                    (selectedMarkers.length > 0 && action.chooseOnMap) && selectedMarkers?.map((item, idx) => {
                        if (item.location.hasOwnProperty("lat") && item.location.hasOwnProperty("lon")) {
                            return (
                                <Marker
                                    key={idx}
                                    draggable={!action.isMarkerLocked}
                                    children={<LocationMarker title={item.location.display_name} />
                                    }
                                    anchor="bottom"
                                    // onDrag={(e) => console.log(e)}
                                    latitude={item.location?.lat} longitude={item.location?.lon} />
                            )
                        }
                    })
                }

                {
                    (!action.isDirection || action.isSetLocationByMarker) && <LocationMarker centerMode={true} isDrag={isDrag} />
                }
            </Map>

        </div>

    )
}

export default MainMap