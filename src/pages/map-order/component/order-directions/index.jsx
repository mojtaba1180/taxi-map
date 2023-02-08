
import React from 'react';
import { Layer, Source, useMap } from 'react-map-gl';
import { useLocation } from 'react-router-dom';
import { RoutingApi } from '../../../../apis/routing-api';
import MapOrderQuery from '../../map-order-query';
import DirectionPoint from './direction-point';
const OrderDirections = () => {
    const { search } = useLocation();
    const [loading] = React.useState(false);
    const query = MapOrderQuery({ search });
    const [coordinates, setCoordinates] = React.useState([]);
    const [locations, setLocations] = React.useState([]);
    const { usemap } = useMap();
    const handleGetLocations = async () => {
        const { res, err } = await RoutingApi.getOrderLocations(query);
        if (res) {
            const arr = res.locations.map(item => {
                return [item.lat, item.lng];
            })
            setLocations(res.locations);
            setCoordinates(arr);

            // console.log(usemap.isStyleLoaded())
            usemap.flyTo({ center: [arr[0][1], arr[0][0]] })

        }
    }


    React.useLayoutEffect(() => {
        if (query.start && query.end && query.top && query.auth_key) {
            handleGetLocations();
        }
    }, [])

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
            </Source>
            {
                locations && locations?.map((item, idx) => {
                    return (
                        <DirectionPoint {...item} key={idx} />
                    )
                })
            }
        </>
    )
}

export default OrderDirections