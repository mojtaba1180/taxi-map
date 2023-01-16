
import maplibreGl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import React, { useEffect, useState } from 'react';
import { Layer, Map, Marker, Source } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { drivers } from '../../json/drivers.json';
import LocationMarker from '../location-marker/location-marker';



import {
    mapCenter, selectCenter,
    selectCoordinates,
    setDrag
} from '../../store/mapSlice';
import './main-map.css';
const MainMap = () => {
    //redux state
    const center = useSelector(selectCenter);
    const coordinates = useSelector(selectCoordinates);
    const dispatch = useDispatch();
    //react state
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [isDrag, setIsDrag] = useState(false);
    const [zoom, setZoom] = useState(14);

    let GeoJson = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: coordinates
                }
            }
        ]
    };

    //set current center 
    useEffect(() => {
        dispatch(mapCenter({
            lat,
            lng,
            zoom
        }))
    }, [lat, lng, zoom])

    // set actions on map
    useEffect(() => {
        dispatch(setDrag(isDrag))
    }, [isDrag])


    const MapStyle = "https://tile.snappmaps.ir/styles/snapp-style/style.json"
    const tab30MapStyle = "https://tap30.services/styles/customer/style.json"

    const handleDragStart = () => {
        setIsDrag(true);
    }
    const handleDrag = ({ viewState }) => {
        setLat(viewState.latitude);
        setLng(viewState.longitude);
        setZoom(viewState.zoom)
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

                // mapLib={mapboxgl}
                mapLib={maplibreGl}
                initialViewState={{
                    longitude: center.lng,
                    latitude: center.lat,
                    zoom: center.zoom
                }}
                id="usemap"

                style={{ width: "100%", height: "100vh" }}
                mapStyle={tab30MapStyle}
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                onZoom={handleDrag}
                onZoomStart={handleDragStart}
                onZoomEnd={handleDragEnd}
            >


                <Source id="my-data" type="geojson" data={GeoJson}>
                    <Layer
                        id="lineLayer"
                        type="line"
                        source="my-data"
                        layout={{
                            "line-join": "round",
                            "line-cap": "round"
                        }}
                        paint={{
                            "line-color": "rgba(238, 3, 3, 0.5)",
                            "line-width": 5
                        }}
                    />
                </Source>

                {
                    zoom >= 13 && drivers.map(item => {
                        return (
                            <Marker key={item.id} children={
                                <img src='/car.png' width={15} alt="car" />
                            }
                                latitude={item.location.latitude} longitude={item.location.longitude} rotation={item.location.bearing} />


                        )
                    })
                }
                <LocationMarker isDrag={isDrag} />
                {/* <NavigationControl position="top-left" /> */}
            </Map>

        </div>

    )
}

export default MainMap