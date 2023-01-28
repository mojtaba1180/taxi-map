import React, { useEffect } from 'react';
import { Layer, Source } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { RoutingApi } from './../../apis/routing-api';
import { addCoordinates, LocationsReady, selectCoordinates, selectLocations } from './../../store/mapSlice';
const LayerLineRoute = () => {
    const coordinates = useSelector(selectCoordinates);
    const locations = useSelector(selectLocations);
    const locationsReady = useSelector(LocationsReady);
    const dispatch = useDispatch()
    useEffect(() => {
        const getRoutingDirection = async () => {
            await locationsReady.then(async (res) => {
                if (res) {
                    //create url
                    let lat_lon = "";
                    await locations.locations.map(item => lat_lon = `${lat_lon}${item.location.lon},${item.location.lat};`);
                    const { res, err } = await RoutingApi.getRoutingDirection({
                        routeType: locations.routedType,
                        lat_lon: lat_lon.slice(";", -1),
                        step: true
                    });
                    if (err) console.log(err);
                    if (res) {
                        res.routes.map(item => {
                            dispatch(addCoordinates(item.geometry.coordinates))
                        })
                    }
                }
            })
        }
        getRoutingDirection()
    }, [locations])

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
                    "line-color": "rgb(133, 0, 0)",
                    "line-width": 5
                }}
            />
        </Source>
    )
}

export default LayerLineRoute