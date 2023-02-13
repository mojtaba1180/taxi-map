
import React from 'react';
import { Layer, Source } from 'react-map-gl';

type Prop = {
    coordinates: Array<Number>
    children: HTMLElement
}

const DirectionLine = ({coordinates,children}:Prop) => {



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
                    id="mapOrderLine" type="geojson" data={GeoJson}>
                    <Layer
                        id="lineLayer"
                        type="line"
                        source="mapOrderLine"
                        layout={{
                            "line-join": "round",
                            "line-cap": "round"
                        }}
                        paint={{
                            "line-color": "rgb(133, 0, 0)",
                            "line-width": 5
                        }}
                    />
                    {
                        children
                    }
                </Source>
            

        </>
    )
}

export default DirectionLine