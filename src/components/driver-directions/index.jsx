
import React from 'react';
import { Layer, Source } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { selectCoordinates, selectLocations } from '../../store/mapSlice';
import DirectionPoint from './direction-point';
const DriverDirections = () => {
    const coordinates = useSelector(selectCoordinates);
    const locations = useSelector(selectLocations);
    const dispatch = useDispatch();

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


    return (
        <>

            <Source
                id="my-data" type="geojson" data={GeoJson}>
                <Layer
                    id="lineLayer"
                    type="line"
                    source="my-data"
                    layout={{
                        "line-join": "round",
                        "line-cap": "round"
                    }}
                    paint={{
                        "line-color": "#0008ff",
                        "line-width": 5
                    }}
                />
                {
                    coordinates.map((item, idx) => {
                        return (
                            <DirectionPoint {...item} key={idx} />
                        )
                    })
                }
            </Source>
        </>
    )
}

export default DriverDirections