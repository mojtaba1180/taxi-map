
import maplibreGl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import React, { useEffect, useState } from 'react';
import { GeolocateControl, Map, Marker, Popup } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { drivers } from '../../json/drivers.json';
import LocationMarker from '../location-marker/location-marker';



import {
    LocationsReady,
    mapCenter, selectAction, selectCenter, setDrag
} from '../../store/mapSlice';
import LayerLineRoute from '../map-direction/layer-line-route';
import { selectLocations } from './../../store/mapSlice';
import './main-map.css';
const MainMap = () => {
    //redux state
    const center = useSelector(selectCenter);
    const {locations} = useSelector(selectLocations);
    const locationsReady = useSelector(LocationsReady);
    
    const mapStyle = import.meta.env.VITE_MAP_STYLE;

    const action = useSelector(selectAction);
    const dispatch = useDispatch();
    //react state
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [isDrag, setIsDrag] = useState(false);
    const [zoom, setZoom] = useState(14);
    const [popupInfo , setPopupInfo] = useState(null);
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
                onClick={(e) =>console.log(e)}
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


                <LayerLineRoute/>

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
                {
                    locations?.map((item,idx) => {
                        if(item.location.hasOwnProperty("lat") && item.location.hasOwnProperty("lon")){
                            return (
                                <Marker
                                key={idx}
                                draggable={true}
                                children={<LocationMarker  />
                                }
                                 anchor="bottom"
                                onClick={(e) => {
                                     e.originalEvent.stopPropagation();
                                    setPopupInfo(item)
                                    console.log('salam');
                                }}
                                // onDrag={(e) => console.log(e)}
                                latitude={item.location?.lat} longitude={item.location?.lon} />
                            )
                        }
                    })
                }
                {
                    popupInfo && (
                        <Popup
                        anchor='bottom'
                        longitude={Number(popupInfo.location.lon)}
                        latitude={Number(popupInfo.location.lat)}
                        onClick={() => setPopupInfo(null)}
                        closeOnMove={true}
                        
                        >
                          <div style={{zIndex:2555}}>
                            {popupInfo.location.display_name} 
                          </div>
                        </Popup>
                    )
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