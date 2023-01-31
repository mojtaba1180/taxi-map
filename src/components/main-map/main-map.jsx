
import maplibreGl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import qs from "qs";
import React, { useEffect, useState } from 'react';
import { GeolocateControl, Map, Marker } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { drivers } from '../../json/drivers.json';
import { mapCenter, selectAction, selectCenter, setDrag } from '../../store/mapSlice';
import LocationMarker from '../location-marker/location-marker';
import LayerLineRoute from '../map-direction/layer-line-route';
import { selectLocations } from './../../store/mapSlice';
import './main-map.css';




const MainMap = () => {
    //redux state
    const center = useSelector(selectCenter);
    const { locations } = useSelector(selectLocations);
    const mapStyle = import.meta.env.VITE_MAP_STYLE;
    const action = useSelector(selectAction);
    const dispatch = useDispatch();
    //react state
    const [isDrag, setIsDrag] = useState(false);
    const { search } = useLocation();


    // ANCHOR handle center mode in search query string 
    const query = qs.parse(search.split("?")[1]);
    const arrayMapCenter = query.center ? query.center.split(",").map(i => Number(i)) : null

    // set actions on map
    useEffect(() => {
        dispatch(setDrag(isDrag))
    }, [isDrag]);


    const handleDragStart = () => {
        setIsDrag(true);
    }
    const handleDrag = ({ viewState }) => {
        dispatch(mapCenter({
            lat: viewState.latitude,
            lng: viewState.longitude,
            zoom: viewState.zoom
        }))
    }
    const handleDragEnd = () => {
        setIsDrag(false);
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
                onClick={(e) => console.log(e)}
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
                {
                    center.zoom >= 13 && drivers.map(item => {
                        return (
                            <Marker key={item.id} children={
                                <img src='/car.png' width={15} alt="car" />
                            }
                                latitude={item.location.latitude} longitude={item.location.longitude} rotation={item.location.bearing} />


                        )
                    })
                }
                {
                    locations?.map((item, idx) => {
                        if (item.location.hasOwnProperty("lat") && item.location.hasOwnProperty("lon")) {
                            return (
                                <Marker
                                    key={idx}
                                    draggable={!action.isMarkerLocked}
                                    children={<LocationMarker title={item.location.display_name} color={item.color} />
                                    }
                                    anchor="bottom"
                                    // onDrag={(e) => console.log(e)}
                                    latitude={item.location?.lat} longitude={item.location?.lon} />
                            )
                        }
                    })
                }
                <GeolocateControl
                    position='bottom-left'
                />
                {
                    (!action.isDirection || action.isSetLocationByMarker) && <LocationMarker centerMode={true} isDrag={isDrag} />
                }
                {/* <NavigationControl position="top-left" /> */}
            </Map>

        </div>

    )
}

export default MainMap